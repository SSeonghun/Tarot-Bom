package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.request.CustomUserInfoDto;
import com.ssafy.tarotbom.domain.member.dto.request.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.SignupReqDto;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.jwt.JwtUtil;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.domain.member.email.EmailTool;
import com.ssafy.tarotbom.global.config.RedisTool;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.dto.LoginResponseDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Base64;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final TokenService tokenService;

    private final RedisTool redisTool;
    private final EmailTool emailTool;
    private static final String AUTH_CODE_PREFIX = "AuthCode:";

    @Value("${spring.mail.auth-code-expiration-millis}")
    private Long authCodeExpirationMillis;

    @Override
    @Transactional
    public LoginResponseDto login(LoginReqDto loginReqDto, HttpServletResponse response) throws BadCredentialsException, UsernameNotFoundException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        log.info(email);
        Member member = memberRepository.findMemberByEmail(email).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 암호화된 password를 디코딩 한 결과값과 입력한 패스워드 값이 다르면 null 반환
        if(!passwordEncoder.matches(password, member.getPassword())){
            throw new BusinessException(ErrorCode.MEMBER_DIFF_PASSWORD);
        }

        log.info("[MemberServiceImpl - login] loginReqDto : {}", loginReqDto.getEmail());

//        CustomUserInfoDto info = modelMapper.map(member, CustomUserInfoDto.class);

        CustomUserInfoDto info = CustomUserInfoDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .memberType(member.getMemberType())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .build();


        log.info("[MemberServiceImpl - login] CustomUserInfoDto : {}", info.getMemberType());
        String accessToken = jwtUtil.createAccessToken(info);
//        response.add(JwtUtil.AUTHORIZATION_HEADER, accessToken);

        String refreshToken = jwtUtil.createRefreshToken(info);
//        response.addHeader("RefreshToken:", refreshToken);


        log.info("[MemberServiceImpl - login] Access Token: {}", accessToken);
        log.info("[MemberServiceImpl - login] Refresh Token : {}", refreshToken);

        // 액세스 토큰 쿠키 설정
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(60 * 60); // 1시간

        String storedRefreshToken = tokenService.getRefreshToken(member.getMemberId());

        if(storedRefreshToken != null) {
            tokenService.deleteRefreshToken(member.getMemberId());
        }


        // 리프레시 토큰 쿠키 설정
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(60 * 60 * 24 * 7); // 7일

        tokenService.saveRefreshToken(String.valueOf(member.getMemberId()), refreshToken, 7, TimeUnit.DAYS);

        String memberId = tokenService.getRefreshToken(member.getMemberId());
        log.info("[MemberServiceImpl-login] redisMemberId : {}", memberId );

        return new LoginResponseDto("로그인 성공", accessTokenCookie, refreshTokenCookie);

    }

    @Override
    @Transactional
    public boolean signup(SignupReqDto signupReqDto) throws BusinessException {
        BCryptPasswordEncoder bcrypasswordEncoder = new BCryptPasswordEncoder();

        String nickname = signupReqDto.getNickname();
        String email = signupReqDto.getEmail();
        String password = bcrypasswordEncoder.encode(signupReqDto.getPassword());

        Optional<Member> findMemberByNickname = memberRepository.findMemberByNickname(nickname);
        if(findMemberByNickname.isPresent()){
            throw new BusinessException(ErrorCode.MEMBER_DUPLICATED);
        }

        Optional<Member> findMemberByEmail = memberRepository.findMemberByEmail(email);
        if(findMemberByEmail.isPresent()){
            throw new BusinessException(ErrorCode.MEMBER_DUPLICATED);
        }

        CodeDetail codeDetail = new CodeDetail("M01", "Seeker", "1"); // DB에 저장된 후에 코드 refactoring

        Member member = new Member(nickname, email, password, codeDetail);
        memberRepository.save(member);

        return true;

    }

    private String createCode(){
        Random random = new Random();
        String randomNumber = "";
        for(int i=0; i<6; i++){
            randomNumber += Integer.toString(random.nextInt(10));
        }

        return randomNumber;
    }

    @Override
    public boolean sendCodeToEmail(String toEmail){

        // 이메일 중복 검사
        Optional<Member> findMemberByEmail = memberRepository.findMemberByEmail(toEmail);
        if(findMemberByEmail.isPresent()){
            throw new BusinessException(ErrorCode.MEMBER_DUPLICATED);
        }

        // 인증 코드 생성, 저장, 이메일 전송
        String title = "유저 이메일 인증 번호";
        String authCode = this.createCode();
        String text = "타로봄에 오신 것을 환영합니다.\n\n"
                + "      인증 번호는\n\n" +"         " + authCode + "\n\n         입니다.";


        // 이미 인증 번호를 보내 레디스 서버에 인증번호가 있음
        String pinNum = redisTool.getValues(AUTH_CODE_PREFIX + toEmail);
        if(pinNum != null) {
            // 해당 레디스 키를 삭제하고 재발급
            redisTool.deleteValue(AUTH_CODE_PREFIX + toEmail);
        }

        redisTool.setValues(AUTH_CODE_PREFIX + toEmail , authCode, Duration.ofMillis(authCodeExpirationMillis));
        emailTool.sendEmail(toEmail, title, text);

        return true;
    }

    @Override
    public boolean verifyCode(String email, String authCode) {

        String redisAuthCode = redisTool.getValues((AUTH_CODE_PREFIX + email));
        log.info("redis get pinNumber : {} ",redisAuthCode);
//        if(!(redisTool.checkExistsValue(redisAuthCode) && redisAuthCode.equals(authCode))){
//            throw new BusinessException(ErrorCode.MEMBER_INVALID_CODE);
//        }
        if(!(redisAuthCode.equals(authCode))){
            throw new BusinessException(ErrorCode.MEMBER_INVALID_CODE);
        }
        return true;
    }


    /**
     * 엑세스 토큰 발급
     * @param loginReqDto
     * @return
     */
    @Override
    public Cookie createAceessToken(LoginReqDto loginReqDto, HttpServletResponse response, HttpServletRequest request) {

        // 클라이언트에서 받은 토큰
        String refreshTokenReq = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshTokenReq = cookie.getValue();
                    break;
                }
            }
        }
        Long memberIdFromToken = jwtUtil.getMemberId(refreshTokenReq);

        // 레디스에서 받은 토큰
        String memberIdToken = tokenService.getRefreshToken(memberIdFromToken);

        if(refreshTokenReq == memberIdToken && jwtUtil.validateToken(refreshTokenReq) && jwtUtil.validateToken(memberIdToken)) {

            Member member = memberRepository.findMemberByMemberId(memberIdFromToken).orElseThrow(
                    () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
            );

            CustomUserInfoDto info = CustomUserInfoDto.builder()
                    .memberId(member.getMemberId())
                    .email(member.getEmail())
                    .memberType(member.getMemberType())
                    .password(member.getPassword())
                    .nickname(member.getNickname())
                    .build();

            String accessToken = jwtUtil.createAccessToken(info);

            Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setSecure(true);
            accessTokenCookie.setPath("/");
            accessTokenCookie.setMaxAge(60 * 60); // 1시간

            return accessTokenCookie;
        }

        return null;

    }

}
