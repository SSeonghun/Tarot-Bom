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
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
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
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    private final RedisTool redisTool;
    private final EmailTool emailTool;
    private static final String AUTH_CODE_PREFIX = "AuthCode ";

    @Value("${spring.mail.auth-code-expiration-millis}")
    private Long authCodeExpirationMillis;

    @Override
    @Transactional
    public boolean login(LoginReqDto loginReqDto, HttpServletResponse response) throws BadCredentialsException, UsernameNotFoundException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        log.info(email);
        Member member = memberRepository.findMemberByEmail(email).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 암호화된 password를 디코딩 한 결과값과 입력한 패스워드 값이 다르면 null 반환
        if(!passwordEncoder.matches(password, member.getPassword())){
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }

        CustomUserInfoDto info = modelMapper.map(member, CustomUserInfoDto.class);

        response.addHeader(JwtUtil.AUTHORIZATION_HEADER, jwtUtil.createAccessToken(info));

        return true;

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

        redisTool.setValues(AUTH_CODE_PREFIX + toEmail , authCode, Duration.ofMillis(authCodeExpirationMillis));
        emailTool.sendEmail(toEmail, title, text);

        return true;
    }

    @Override
    public boolean verifyCode(String email, String authCode) {
        String redisAuthCode = redisTool.getValues((AUTH_CODE_PREFIX + email));
        if(!redisTool.checkExistsValue(redisAuthCode) && redisAuthCode.equals(authCode)){
            throw new BusinessException(ErrorCode.MEMBER_INVALID_CODE);
        }
        return true;
    }

}
