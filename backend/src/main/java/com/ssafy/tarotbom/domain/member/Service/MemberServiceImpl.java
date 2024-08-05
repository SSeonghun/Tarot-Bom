package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.ReaderAnalyzeDto;
import com.ssafy.tarotbom.domain.member.dto.SeekerAnalyzeDto;
import com.ssafy.tarotbom.domain.member.dto.request.*;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderMypageResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReviewReaderResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.SeekerMypageResponseDto;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.jwt.JwtUtil;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.service.ReservationService;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import com.ssafy.tarotbom.domain.review.repository.ReviewReaderRepository;
import com.ssafy.tarotbom.domain.tarot.dto.TarotResultCardDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultRepository;
import com.ssafy.tarotbom.domain.tarot.service.TarotResultService;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.domain.member.email.EmailTool;
import com.ssafy.tarotbom.global.code.entity.repository.CodeDetailRepository;
import com.ssafy.tarotbom.global.config.RedisTool;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.domain.member.dto.response.LoginResponseDto;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final ReaderRepository readerRepository;
    private final CodeDetailRepository codeDetailRepository;
    private final ReservationService reservationService;
    private final TarotResultService tarotResultService;
    private final ReviewReaderRepository reviewReaderRepository;

    private final RedisTool redisTool;
    private final EmailTool emailTool;
    private final CookieUtil cookieUtil;

    private static final String AUTH_CODE_PREFIX = "AuthCode:";

    @Value("${spring.mail.auth-code-expiration-millis}")
    private Long authCodeExpirationMillis;


    /**
     * 로그인 메서드
     * JWT 인증 토큰 2개 발급
     *
     * @param loginReqDto
     * @param response
     * @return
     * @throws BadCredentialsException
     * @throws UsernameNotFoundException
     */
    @Override
    @Transactional
    public LoginResponseDto login(LoginReqDto loginReqDto, HttpServletResponse response) throws BadCredentialsException, UsernameNotFoundException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        log.info(email);
        Member member = memberRepository.findMemberByEmail(email).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        String name = member.getNickname();
        // 암호화된 password를 디코딩 한 결과값과 입력한 패스워드 값이 다르면 null 반환
        if(!passwordEncoder.matches(password, member.getPassword())){
            throw new BusinessException(ErrorCode.MEMBER_DIFF_PASSWORD);
        }

        log.info("[MemberServiceImpl - login] loginReqDto : {}", loginReqDto.getEmail());

        // 반환 해주기 위한 DTO 생성
        CustomUserInfoDto info = CustomUserInfoDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .memberType(member.getMemberType())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .build();


//        log.info("[MemberServiceImpl - login] CustomUserInfoDto : {}", info.getMemberType());
        String accessToken = jwtUtil.createAccessToken(info);
        String refreshToken = jwtUtil.createRefreshToken(info);

//        log.info("[MemberServiceImpl - login] Access Token: {}", accessToken);
//        log.info("[MemberServiceImpl - login] Refresh Token : {}", refreshToken);

        // 액세스 토큰 쿠키 설정
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(60 * 60); // 1시간

        String storedRefreshToken = tokenService.getRefreshToken(member.getMemberId());

        // 만약 리프레시 토큰이 있는데 다시 로그인하면 기존 리프레시 토큰 삭제
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

//        String memberId = tokenService.getRefreshToken(member.getMemberId());
//        log.info("[MemberServiceImpl-login] redisMemberId : {}", memberId );

        boolean isReader = false; // 리더 프로필이 있는지 없는지 확인하는 변수
        try {
            Long id = member.getMemberId();
            Reader reader = readerRepository.findById(id).orElseThrow(EntityNotFoundException::new);
            isReader = true;
        } catch (NumberFormatException | EntityNotFoundException e) {
            isReader = false;
        }

//        log.info("isReader : {}", isReader);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        LoginResponseDto loginResponseDto = LoginResponseDto
                .builder()
                .email(email)
                .name(name)
                .isReader(isReader)
                .build();

        return loginResponseDto;
    }

    /**
     * 로그아웃 메서드
     * @param request
     */
    @Override
    public void logout(HttpServletRequest request) {

        try {
            String email = cookieUtil.getMemberEmail(request);
            redisTool.deleteValue(AUTH_CODE_PREFIX+email);
        } catch (Exception e) { // todo: Exception으로 받는게 맞나?
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }

    }

    /**
     * 회원 가입
     * @param signupReqDto
     * @return
     * @throws BusinessException
     */
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

//        CodeDetail codeDetail = new CodeDetail("M01", "Seeker", "1"); // DB에 저장된 후에 코드 refactoring

        CodeDetail codeDetail = CodeDetail
                .builder()
                .codeTypeId("1")
                .codeDetailId("M01")
                .detailDesc("Seaker")
                .build();

        Member member = new Member(nickname, email, password, codeDetail);
        memberRepository.save(member);

        return true;

    }

    /**
     * 이메일 인증 번호 랜덤 생성 메서드
     * @return
     */
    private String createCode(){
        Random random = new Random();
        String randomNumber = "";
        for(int i=0; i<6; i++){
            randomNumber += Integer.toString(random.nextInt(10));
        }

        return randomNumber;
    }

    /**
     * 이메일 인증 번호 발송 메서드
     * @param toEmail
     * @return
     */
    @Override
    public boolean sendCodeToEmail(String toEmail){

        // 이메일 중복 검사
        Optional<Member> findMemberByEmail = memberRepository.findMemberByEmail(toEmail);
        if(findMemberByEmail.isPresent()){
            throw new BusinessException(ErrorCode.MEMBER_DUPLICATED);
        }

        // 인증 코드 생성, 저장, 이메일 전송
        // todo: 인증번호 발송 예쁘게 꾸미면 좋음
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

    /**
     * 인증번호 확인 메서드
     * @param email
     * @param authCode
     * @return
     */
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
        else {
            redisTool.deleteValue(AUTH_CODE_PREFIX + email);
        }

        return true;
    }


    /**
     * 엑세스 토큰 발급
     * 리프레시 토큰만 있는 상황
     * @param loginReqDto
     * @return
     */
    @Override
    public Cookie createAceessToken(LoginReqDto loginReqDto, HttpServletResponse response, HttpServletRequest request) {

        // 클라이언트에서 받은 토큰
        String refreshTokenReq = null;
        Cookie[] cookies = request.getCookies();

        if(cookies == null) { //토큰이 없을때
            throw new BusinessException(ErrorCode.MEMBER_COOKIE_NOT_FOUNT);
        }
        else{ // 받은 쿠키들 중에서 refreshToken 찾기
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshTokenReq = cookie.getValue();
                    break;
                }
            }
        }

        // 토큰에서 맴버 아이디 추출
        Long memberIdFromToken = jwtUtil.getMemberId(refreshTokenReq);

        // 레디스에서 받은 토큰 에서 맴버 아이디 추출
        String memberIdToken = tokenService.getRefreshToken(memberIdFromToken);

        // 토큰 인증하고, 두개의 토큰이 같으면
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

        throw new BusinessException(ErrorCode.COMMON_ETC);
    }


    /**
     * 리더 만들기
     * @param readerJoinRequestDto
     */
    @Override
    public void readerJoin(ReaderJoinRequestDto readerJoinRequestDto) {
        // 기본 코드 초기화
        // todo: 이거 코드를 여기서 만들어서 넣는게 아닌 이미 만들어진 코드를 적용시키는 개념? 으로 가야할듯
        CodeDetail defaultCode = CodeDetail.builder()
                .codeDetailId("CO1")
                .codeTypeId("3")
                .detailDesc("기본")
                .build();

        defaultCode = codeDetailRepository.save(defaultCode);

        // 키워드 코드 조회 및 처리
        Optional<CodeDetail> keywordOpt = codeDetailRepository.findById(readerJoinRequestDto.getKeyword());
//        if (!keywordOpt.isPresent()) {
//            throw new BusinessException(ErrorCode.KEYWORD_NOT_FOUND); // 적절한 예외 처리
//        }
        CodeDetail keyword = keywordOpt.get();

        // 회원 조회
        Member member = memberRepository.findById(readerJoinRequestDto.getSeekerId())
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)); // 적절한 예외 처리

        // 리더 객체 생성 후 저장
        Reader reader = Reader.builder()
                .member(member)
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .intro(readerJoinRequestDto.getIntro())
                .keyword(keyword)
                .grade(defaultCode)
                .build();

        readerRepository.save(reader);
    }


    /**
     * 리더/시커 전환시 엑세스 토큰 재발급
     * 이 엑세스 토큰을 기준으로 리더 시커 전환
     * 1시간 유효인데 1시간이 지나면? -> 오류 발생 할듯
     * @return
     */
    @Override
    public Cookie changeAccessToken(HttpServletRequest request) {

        long memberId = cookieUtil.getUserId(request);
        String type = cookieUtil.getMemberType(request);
        String email = cookieUtil.getMemberEmail(request);

        log.info("{}, {}, {}", memberId, type, email);

        CodeDetail memberCode = null;

        if(type.equals("M01")) { //seaker
            memberCode = CodeDetail
                    .builder()
                    .codeDetailId("M03")
                    .codeTypeId("0")
                    .detailDesc("리더")
                    .build();
        } else if(type.equals("M03")) { //reader
            memberCode = CodeDetail
                    .builder()
                    .codeDetailId("M01")
                    .codeTypeId("0")
                    .detailDesc("시커")
                    .build();
        }

        CustomUserInfoDto member = CustomUserInfoDto
                .builder()
                .memberId(memberId)
                .memberType(memberCode)
                .email(email)
                .build();

        String newAccessToken = jwtUtil.createAccessToken(member);

        log.info("new AccessToken : {}", newAccessToken);

        // 기존 엑세스 토큰 쿠키 제거
        Cookie oldTokenCookie = new Cookie("accessToken", "");
        oldTokenCookie.setMaxAge(0); // 즉시 만료
        oldTokenCookie.setPath("/"); // 경로 설정

        Cookie newTokenCookie = new Cookie("accessToken", newAccessToken);
        newTokenCookie.setHttpOnly(true);
        newTokenCookie.setSecure(true);
        newTokenCookie.setMaxAge(60 * 60); // 1시간 유효
        newTokenCookie.setPath("/"); // 경로 설정


        return newTokenCookie;
    }

    /**
     * 시커 마이페이지
     * @param request
     * @return
     */
    @Override
    public SeekerMypageResponseDto seekerMypage(HttpServletRequest request, MypageRequestDto seekerMypageRequestDto) {

        // 아이디 가져오기
        long memberId = cookieUtil.getUserId(request);
        String email = cookieUtil.getMemberEmail(request);

        // 최근 타로 결과 내역
        List<TarotResultGetResponseDto> tarotResultGetResponseDtos = tarotResultService.getAllTarotResultsBySeekerId(memberId);

        int[] category = new int[5];

        // 최근 타로 내역 분석을 위한 로직
        // 30개 까지만 조회하는데 30개 미만일때 처리
        // todo: 타로 결과 조회 할때 limit 30개 걸면 될듯?
        if(tarotResultGetResponseDtos.size() < 30) {
            for (int i = 0; i < tarotResultGetResponseDtos.size(); i++) {
                TarotResultGetResponseDto tarotResultGetResponseDto = tarotResultGetResponseDtos.get(i);

                // 30개의 키워드 확인
                String temp = tarotResultGetResponseDto.getKeyword();
                int num = countCategory(temp);

                category[num]++;

                log.info("{}", temp);

            }
        } else {
            for (int i = 0; i < 30; i++) {
                TarotResultGetResponseDto tarotResultGetResponseDto = tarotResultGetResponseDtos.get(i);

                // 30개의 키워드 확인
                String temp = tarotResultGetResponseDto.getKeyword();
                int num = countCategory(temp);

                category[num]++;

                log.info("{}", temp);

            }
        }

        // Map에 넣어서 넘겨줌 <카테고리, 횟수>
        Map<String, Integer> map = new HashMap<>();

        String[] str = {"G01", "G02", "G03", "G04", "G05"};

        for(int i = 0; i < 5; i++) {
            map.put(str[i], category[i]);
        }

        SeekerAnalyzeDto seekerAnalyzeDto = SeekerAnalyzeDto
                .builder()
                .categories(map)
                .build();

        // 예약 내역
        List<ReadReservationResponseDto> readReservationResponseDtos = reservationService.readReservation(request);

        log.info("isReader : {}", seekerMypageRequestDto.isReader());
        SeekerMypageResponseDto seekerMypageResponseDto = SeekerMypageResponseDto
                .builder()
                .isReader(seekerMypageRequestDto.isReader()) // 리더 프로필 만들기를 띄울 건지, 전환을 띄울 건지
                .reservationList(readReservationResponseDtos)
                .tarotResults(tarotResultGetResponseDtos)
                .totalConserting(tarotResultGetResponseDtos.size())
                .email(email)
                .analyze(seekerAnalyzeDto)
                .name(seekerMypageRequestDto.getName())
                .build();

        return seekerMypageResponseDto;
    }

    /**
     * 각 카테고리별 분기 메서드
     * 타로 결과에서 개수 세기 위한 메서드 분리
     * @param str
     * @return
     */
    private int countCategory(String str) {

        int num = 0;

        if(str.equals("G01")) {
            num = 0;
        } else if(str.equals("G02")) {
            num = 1;
        } else if(str.equals("G03")) {
            num = 2;
        } else if (str.equals("G04")) {
            num = 3;
        } else if (str.equals("G05")) {
            num = 4;
        }
        return num;
    }

    /**
     * 리더 마이페이지에 필요한 정보 비즈니스 로직
     * @param request
     * @param readerMypageReqeusetDto
     * @return
     */
    @Override
    public ReaderMypageResponseDto readerMypage(HttpServletRequest request, MypageRequestDto readerMypageReqeusetDto) {

        long memberId = cookieUtil.getUserId(request);
        String email = cookieUtil.getMemberEmail(request);

        Member reader = memberRepository.getReferenceById(memberId);
        
        if(reader.getReader() == null) { // 리더를 못찾음
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }

        // 최근 타로 결과 내역
        List<TarotResultGetResponseDto> tarotResultGetResponseDtos = tarotResultService.getAllTarotResultsByReaderId(memberId);

        int[] category = new int[5];
        int[] montly = new int[12];

        // 위의 시커 카테고리랑 같은 로직
        // + 월별 타로 상담 횟수 추가
        if(tarotResultGetResponseDtos.size() < 30) {
            for (int i = 0; i < tarotResultGetResponseDtos.size(); i++) {
                TarotResultGetResponseDto tarotResultGetResponseDto = tarotResultGetResponseDtos.get(i);

                // 30개의 키워드 확인
                String temp = tarotResultGetResponseDto.getKeyword();
                int num = countCategory(temp);

                LocalDateTime date = tarotResultGetResponseDto.getDate();
                int month = date.getMonth().getValue() - 1;

//                log.info("{}", month);
                montly[month]++;
                category[num]++;

//                log.info("{}", temp);

            }
        } else {
            for (int i = 0; i < 30; i++) {
                TarotResultGetResponseDto tarotResultGetResponseDto = tarotResultGetResponseDtos.get(i);

                // 30개의 키워드 확인
                String temp = tarotResultGetResponseDto.getKeyword();
                int num = countCategory(temp);

                LocalDateTime date = tarotResultGetResponseDto.getDate();
                int month = date.getMonth().getValue();

//                log.info("{}", month);

                montly[month]++;
                category[num]++;

//                log.info("{}", temp);

            }
        }

        Map<String, Integer> map = new HashMap<>();
        Map<String, Integer> monthMap = new HashMap<>();

        String[] str = {"G01", "G02", "G03", "G04", "G05"};
        String[] monthStr = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"};

        for(int i = 0; i < 5; i++) {
            map.put(str[i], category[i]);
        }

        for(int i = 0; i < 12; i++) {
            monthMap.put(monthStr[i], montly[i]);
        }

        ReaderAnalyzeDto analyzeDto = ReaderAnalyzeDto
                .builder()
                .categories(map)
                .build();

        ReaderAnalyzeDto monthlyDto = ReaderAnalyzeDto
                .builder()
                .categories(monthMap)
                .build();

        // 예약 내역
        List<ReadReservationResponseDto> readReservationResponseDtos = reservationService.readReservation(request);

        List<ReviewReader> reviewReaders = reviewReaderRepository.findByReader(Optional.of(reader));
        List<ReviewReaderResponseDto> reviewList = reviewReaders.stream()
                .map(review -> ReviewReaderResponseDto.builder()
                        .reviewReaderId(String.valueOf(review.getReviewReaderId()))
                        .seekerId(String.valueOf(review.getSeeker().getMemberId()))
                        .readerId(String.valueOf(review.getReader().getMemberId()))
                        .rating(review.getRating())
                        .content(review.getContent())
                        .createTime(review.getCreateTime())
                        .updateTime(review.getUpdateTime())
                        .build())
                .collect(Collectors.toList());

        ReaderMypageResponseDto readerMypageResponseDto = ReaderMypageResponseDto
                .builder()
                .readReservationResponseDtoList(readReservationResponseDtos)
                .tarotResultGetResponseDtos(tarotResultGetResponseDtos)
                .email(email)
                .totalConserting(tarotResultGetResponseDtos.size())
                .categoryanalyze(analyzeDto)
                .monthlyanalyze(monthlyDto)
                .name(readerMypageReqeusetDto.getName())
                .reviewReaderResponseDtos(reviewList)
                .build();


        return readerMypageResponseDto;
    }





}
