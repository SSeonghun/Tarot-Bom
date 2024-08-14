package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.ReaderAbstractReviewDto;
import com.ssafy.tarotbom.domain.member.dto.ReaderAnalyzeDto;
import com.ssafy.tarotbom.domain.member.dto.SeekerAnalyzeDto;
import com.ssafy.tarotbom.domain.member.dto.request.*;
import com.ssafy.tarotbom.domain.member.dto.response.*;
import com.ssafy.tarotbom.domain.member.entity.FavoriteReader;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopReadResponseDto;
import com.ssafy.tarotbom.domain.shop.entity.Shop;
import com.ssafy.tarotbom.domain.shop.repository.ShopRepository;
import com.ssafy.tarotbom.global.util.JwtUtil;
import com.ssafy.tarotbom.domain.member.repository.FavoriteReaderRepository;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.service.ReservationService;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import com.ssafy.tarotbom.domain.review.repository.ReviewReaderRepository;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.service.TarotResultService;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

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
    private final ReservationService reservationService;
    private final TarotResultService tarotResultService;
    private final ReviewReaderRepository reviewReaderRepository;
    private final ShopRepository shopRepository;
    private final S3Service s3Service;
    private final SpringTemplateEngine springTemplateEngine;

    private final MemberRedisService redisService;
    private final JavaMailSender emailSender;
    private final MemberRedisService memberRedisService;
    private final CookieUtil cookieUtil;

    private static final String AUTH_CODE_PREFIX = "AuthCode:";
    private final FavoriteReaderRepository favoriteReaderRepository;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailAddress;

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
                .memberTypeId("M01")
                .password(member.getPassword())
                .nickname(member.getNickname())
                .build();

        String accessToken = jwtUtil.createAccessToken(info);
        String refreshToken = jwtUtil.createRefreshToken(info);

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

        boolean isReader = false; // 리더 프로필이 있는지 없는지 확인하는 변수
        boolean isAdmin = false;
        if(member.getMemberTypeId().equals("M00")) {
            isAdmin = true;
        }
        if(member.getMemberTypeId().equals("M02")) {
            isReader = true;
        }
//        try {
//            Long id = member.getMemberId();
//            Reader reader = readerRepository.findById(id).orElseThrow(EntityNotFoundException::new);
//            isReader = true;
//        } catch (NumberFormatException | EntityNotFoundException e) {
//            isReader = false;
//        }

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        LoginResponseDto loginResponseDto = LoginResponseDto
                .builder()
                .memberId(member.getMemberId())
                .email(email)
                .name(name)
                .isReader(isReader)
                .profileUrl(member.getProfileUrl())
                .isAdmin(isAdmin)
                .build();
        return loginResponseDto;
    }

    /**
     * 로그아웃 메서드
     * @param request
     */
    @Override
    public void logout(HttpServletRequest request) {
        String email = cookieUtil.getMemberEmail(request);
        memberRedisService.deleteValue(AUTH_CODE_PREFIX+email);
    }

    /**
     * 회원 가입
     * @param signupReqDto
     * @return
     * @throws BusinessException
     */
    @Override
    @Transactional
    public void signup(SignupReqDto signupReqDto) throws BusinessException {
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

        Member member = Member.builder()
                .nickname(nickname)
                .email(email)
                .password(password)
                .memberTypeId("M01")
                .profileUrl("https://d2ovihsqke74ur.cloudfront.net/profile/429f76b1-f8ea-44df-bf71-6de4e8471954_기본이미지.webp")
                .build();

        log.info(member.getProfileUrl());

        memberRepository.save(member);

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
    public void sendCodeToEmail(String toEmail){

        // 이메일 중복 검사
        Optional<Member> findMemberByEmail = memberRepository.findMemberByEmail(toEmail);
        if(findMemberByEmail.isPresent()){
            throw new BusinessException(ErrorCode.MEMBER_DUPLICATED);
        }

        // 인증 코드 생성, 저장, 이메일 전송
        // todo: 인증번호 발송 예쁘게 꾸미면 좋음

        String authNum = createCode();
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(toEmail); // 메일 수신자
            mimeMessageHelper.setSubject("[타로:봄] 인증 번호 입니다."); // 메일 제목

            mimeMessageHelper.setText(setContext(authNum), true); // 메일 본문 내용, HTML
            emailSender.send(mimeMessage);

            log.info("success");

        } catch(MessagingException e){
            log.info("fail");
            throw new BusinessException(ErrorCode.EMAIL_SEND_FAIL);
        }

        // 이미 인증 번호를 보내 레디스 서버에 인증번호가 있음
        String pinNum = memberRedisService.getValues(AUTH_CODE_PREFIX + toEmail);
        if(pinNum != null) {
            // 해당 레디스 키를 삭제하고 재발급
            memberRedisService.deleteValue(AUTH_CODE_PREFIX + toEmail);
        }
        redisService.setValues(AUTH_CODE_PREFIX + toEmail , authNum, Duration.ofMillis(authCodeExpirationMillis));
    }
    /**
     * thymeleaf를 통한 html 적용
     */
    public String setContext(String authNum){
        Context context = new Context();
        context.setVariable("code", authNum);
        return templateEngine.process("email", context);
    }

    /**
     * 인증번호 확인 메서드
     * @param email
     * @param authCode
     * @return
     */
    @Override
    public void verifyCode(String email, String authCode) {
        log.info("verify emails {}" , email);
        String redisAuthCode = memberRedisService.getValues((AUTH_CODE_PREFIX + email));
        log.info("redis get pinNumber : {} ",redisAuthCode);
        if(Integer.parseInt(redisAuthCode) != Integer.parseInt(authCode)){
            throw new BusinessException(ErrorCode.MEMBER_INVALID_CODE);
        }
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
            throw new BusinessException(ErrorCode.MEMBER_COOKIE_NOT_FOUND);
        }
        else { // 받은 쿠키들 중에서 refreshToken 찾기
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
        if(refreshTokenReq.equals(memberIdToken) && jwtUtil.validateToken(refreshTokenReq) && jwtUtil.validateToken(memberIdToken)) {

            Member member = memberRepository.findMemberByMemberId(memberIdFromToken).orElseThrow(
                    () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
            );

            CustomUserInfoDto info = CustomUserInfoDto.builder()
                    .memberId(member.getMemberId())
                    .email(member.getEmail())
                    .memberTypeId(member.getMemberTypeId())
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
     * 유저 정보 수정 (프로필 사진 포함)
     * */
    @Override
    public void updateMember(UpdateMemberRequestDto updateMemberRequestDto, MultipartFile profileImage, HttpServletRequest request) {
        long memberId = cookieUtil.getUserId(request);
        Member member = memberRepository.findMemberByMemberId(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
        String newPassword = member.getPassword();
        String newProfileUrl = member.getProfileUrl();
        String newNickname = member.getNickname();
        // 우선은 password를 encrypt하여 수정한다
        if(updateMemberRequestDto.getPassword() != null) {
            BCryptPasswordEncoder bcrypasswordEncoder = new BCryptPasswordEncoder();
            newPassword = bcrypasswordEncoder.encode(updateMemberRequestDto.getPassword());
        }
        // 사진이 업로드된 경우, 링크를 만들어 받는다
        if(profileImage != null && !profileImage.isEmpty()){
            try {
                newProfileUrl = s3Service.upload(profileImage, "profile");
            } catch (IOException e) {
                throw new BusinessException(ErrorCode.MEMBER_PROFILE_UPLOAD_FAILED);
            }
        }
        log.info("현재 프로필 이미지 링크 : {}", newProfileUrl);
        // 마지막으로 닉네임 등록
        if(updateMemberRequestDto.getNickname() != null){
            newNickname = updateMemberRequestDto.getNickname();
        }
        // 이제 바뀌거나 바뀌지 않은 내용을 기반으로 업로드를 시도한다
        member = member.toBuilder()
                .nickname(newNickname)
                .password(newPassword)
                .profileUrl(newProfileUrl)
                .build();

        memberRepository.save(member);
    }

    @Override
    public void updateReader(UpdateReaderRequestDto updateReaderRequestDto, HttpServletRequest request) {
        long memberId = cookieUtil.getUserId(request);
        Reader reader = readerRepository.findByMemberId(memberId);
        if(reader == null) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }
        String newIntro = updateReaderRequestDto.getIntro();
        String newKeyword = updateReaderRequestDto.getKeyword();
        if(!updateReaderRequestDto.getIntro().isEmpty()) {
            newIntro = updateReaderRequestDto.getIntro();
        }
        if(!updateReaderRequestDto.getKeyword().isEmpty()) {
            newKeyword = updateReaderRequestDto.getKeyword();
        }
        reader = reader.toBuilder()
                .intro(newIntro)
                .keywords(newKeyword)
                .build();

        readerRepository.save(reader);
    }

    /**
     * 리더 만들기
     * @param readerJoinRequestDto
     */
    @Override
    public void readerJoin(HttpServletRequest request, ReaderJoinRequestDto readerJoinRequestDto) {
        // 기본 코드 초기화
        // 회원 조회
        long memberId = cookieUtil.getUserId(request);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)); // 적절한 예외 처리
        // 만일 이미 리더 프로필이 있는 유저라면 exception을 발생시킨다
        if(readerRepository.existsByMemberId(memberId)) {
            throw new BusinessException(ErrorCode.MEMBER_ALREADY_READER);
        }
        // 리더 객체 생성 후 저장
        Reader reader = Reader.builder()
                .member(member)
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .intro(readerJoinRequestDto.getIntro())
                .keywords(readerJoinRequestDto.getKeyword())
                .gradeCode("C01") // 공통코드 1번으로 전환 완료
                .build();
        readerRepository.save(reader);
        // 이후 기존 멤버 객체의 공통코드도 바꾼다
        member = member.toBuilder().memberTypeId("M02").build();
        memberRepository.save(member);
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

        log.info("MemberService memberId {}, type {}, email {}", memberId, type, email);

        String changedType = null;
        if(type.equals("M01")) {
            // 기존에 시커였던 경우 : 리더 프로필이 있는지 확인한다
            if(!readerRepository.existsByMemberId(memberId)){
                throw new BusinessException(ErrorCode.MEMBER_YOU_ARE_NOT_READER);
            }
            // 있다면 변경해준다
            changedType = "M02";
        } else if(type.equals("M02")) {
            // 리더였던 경우 : 시커 프로필은 무조건 있으므로 바로 바꿔준다
            changedType = "M01";
        }
        log.info("권한 변경 changenpm : {} -> {}", type, changedType);
        CustomUserInfoDto member = CustomUserInfoDto
                .builder()
                .memberId(memberId)
                .memberTypeId(changedType)
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
    public SeekerMypageResponseDto seekerMypage(HttpServletRequest request) {

        // 아이디 가져오기
        long memberId = cookieUtil.getUserId(request);
        String email = cookieUtil.getMemberEmail(request);

        // 최근 타로 결과 내역
        List<TarotResultGetResponseDto> tarotResultGetResponseDtos = tarotResultService.getAllTarotResultsBySeekerId(memberId, 30);

        int[] category = new int[5];

        // 최근 타로 내역 분석을 위한 로직
        // 30개 까지만 조회하는데 30개 미만일때 처리

        for (int i = 0; i < tarotResultGetResponseDtos.size(); i++) {
            TarotResultGetResponseDto tarotResultGetResponseDto = tarotResultGetResponseDtos.get(i);
            // 30개의 키워드 확인
            String temp = tarotResultGetResponseDto.getKeyword();
            int num = countCategory(temp);
            category[num]++;
            log.info("{}", temp);

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
        Member member = memberRepository.findMemberByMemberId(memberId).get();
        boolean isReader;
         if(member.getMemberTypeId().equals("M01")){
             isReader = false;
         } else {
             isReader = true;
         }
        // log.info("isReader : {}", isReader);

        // 찜 리스트
        List<ReaderListResponseDto> favoriteReaderList = new ArrayList<>();
        List<FavoriteReader> queryList = favoriteReaderRepository.findBySeekerId(memberId);
        for(FavoriteReader favoriteReader : queryList) {
            Reader reader = favoriteReader.getReader();
            Member readerInfo = reader.getMember();
            favoriteReaderList.add(
                        ReaderListResponseDto.builder()
                                .memberId(reader.getMemberId())
                                .profileUrl(readerInfo.getProfileUrl())
                                .name(readerInfo.getNickname())
                                .keyword(reader.getKeywords())
                                .intro(reader.getIntro())
                                .rating(reader.getRating())
                                .grade(reader.getGradeCode())
                                .build()
            );
        }

        SeekerMypageResponseDto seekerMypageResponseDto = SeekerMypageResponseDto
                .builder()
                .isReader(isReader) // 리더 프로필 만들기를 띄울 건지, 전환을 띄울 건지
                .reservationList(readReservationResponseDtos)
                .tarotResults(tarotResultGetResponseDtos)
                .totalConsulting(tarotResultGetResponseDtos.size())
                .favoriteReaderList(favoriteReaderList)
                .email(email)
                .analyze(seekerAnalyzeDto)
                .name(member.getNickname())
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
     * @return
     */
    @Override
    public ReaderMypageResponseDto readerMypage(HttpServletRequest request) {

        long memberId = cookieUtil.getUserId(request);
        String email = cookieUtil.getMemberEmail(request);

        Member reader = memberRepository.getReferenceById(memberId);
        
        if(reader.getReader() == null) { // 리더를 못찾음
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }

        // 최근 타로 결과 내역
        List<TarotResultGetResponseDto> tarotResultGetResponseDtos = tarotResultService.getAllTarotResultsByReaderId(memberId, 30);

        int[] category = new int[5];
        int[] montly = new int[12];

        // 위의 시커 카테고리랑 같은 로직
        // + 월별 타로 상담 횟수 추가

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

        // 리뷰
        List<ReviewReader> reviewReaders = reviewReaderRepository.findByReader(Optional.of(reader));
        List<ReaderAbstractReviewDto> reviewList = new ArrayList<>();
        for(ReviewReader reviewReader : reviewReaders) {
           reviewList.add(
                   ReaderAbstractReviewDto.builder()
                           .reviewReaderId(reviewReader.getReviewReaderId())
                           .seekerId(reviewReader.getSeekerId())
                           .seekerName(reviewReader.getSeeker().getNickname())
                           .seekerProfileUrl(reviewReader.getSeeker().getProfileUrl())
                           .readerId(reviewReader.getReaderId())
                           .rating(reviewReader.getRating())
                           .content(reviewReader.getContent())
                           .build()
           );
        }
        // shop 정보 찾기
        Shop shop = shopRepository.findByReaderId(memberId);
        // shop 정보가 없는 경우는 null을 넣는다
        ShopReadResponseDto shopInfo = null;
        if(shop != null) {
            shopInfo = ShopReadResponseDto.builder()
                    .shopId(shop.getShopId())
                    .readerId(shop.getReaderId())
                    .shopName(shop.getShopName())
                    .address(shop.getAddress())
                    .phone(shop.getPhone())
                    .longitude(shop.getLongitude())
                    .latitude(shop.getLatitude())
                    .build();
        }

        ReaderMypageResponseDto readerMypageResponseDto = ReaderMypageResponseDto
                .builder()
                .readReservationResponseDtoList(readReservationResponseDtos)
                .tarotResultGetResponseDtos(tarotResultGetResponseDtos)
                .email(email)
                .totalConsulting(tarotResultGetResponseDtos.size())
                .categoryanalyze(analyzeDto)
                .monthlyanalyze(monthlyDto)
                .name(reader.getNickname())
                .reviewReaderResponseDtos(reviewList)
                .shopInfo(shopInfo)
                .build();

        return readerMypageResponseDto;
    }

}
