package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.service.FavoriteReaderService;
import com.ssafy.tarotbom.domain.member.service.MemberService;
import com.ssafy.tarotbom.domain.member.service.ReaderService;
import com.ssafy.tarotbom.domain.member.dto.request.*;
import com.ssafy.tarotbom.domain.member.dto.response.*;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
//@CrossOrigin(origins = "https://localhost:3000") // 허용할 출처 설정
public class MemberController {

    private final MemberService memberService;
    private final ReaderService readerService;
    private final FavoriteReaderService favoriteReaderService;

    ///////////////////////////////////////////////
    //                회원 관련                   //
    //////////////////////////////////////////////

    /**
     * 로그인
     * @param loginReqDto
     * @param response
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){
        LoginResponseDto result = memberService.login(loginReqDto, response);

        return ResponseEntity.status(ResultCode.LOGIN_OK.getStatus()).body(result);
    }

    /**
     * 이메일 인증번호 발송
     * @param emailReqDto
     * @return
     */
    @PostMapping("/emails/verifications")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody EmailReqDto emailReqDto){
        log.info("email Varification");
        if(memberService.sendCodeToEmail(emailReqDto.getEmail())){
            return ResponseEntity.status(ResultCode.EMAIL_SEND_OK.getStatus()).body(null);
        }else{
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

    /**
     * 이메일 인증번호 확인
     * @param emailcheckReqDto
     * @return
     */
    @PostMapping("/emails/check")
    public ResponseEntity<?> verifyCode(@Valid @RequestBody EmailCheckReqDto emailcheckReqDto){

        log.info("pinNumber : {} ", emailcheckReqDto.getVerificationCode());

        memberService.verifyCode(emailcheckReqDto.getEmail(), emailcheckReqDto.getVerificationCode());
        if(memberService.verifyCode(emailcheckReqDto.getEmail(), emailcheckReqDto.getVerificationCode())){
            return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(null);
        }else {
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

    /**
     * 회원가입
     * @param signupReqDto
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto){
        log.info("SingupDto : {}", signupReqDto.getEmail());
        if(memberService.signup(signupReqDto)) {
            return ResponseEntity.status(ResultCode.SIGNUP_OK.getStatus()).body(null);
        }else{
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }

    }

    /**
     * 리더 만들기 요청
     * @param readerJoinRequestDto
     * @return
     */
    @PostMapping("/readerjoin")
    public ResponseEntity<?> readerJoin(@Valid @RequestBody ReaderJoinRequestDto readerJoinRequestDto) {

        memberService.readerJoin(readerJoinRequestDto);

        ResultResponse resultResponse = ResultResponse.of(ResultCode.READER_JOIN_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 리더 시커 전환
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/changeAccessToken")
    public ResponseEntity<?> changeAccessToken(HttpServletRequest request, HttpServletResponse response){

        Cookie newAccessToken = memberService.changeAccessToken(request);

        response.addCookie(newAccessToken);

        ResultResponse resultResponse = ResultResponse.of(ResultCode.CHANGE_READER_SEEKER_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout (HttpServletRequest request) {

        memberService.logout(request);

        ResultResponse resultResponse = ResultResponse.of(ResultCode.LOGOUT_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    ///////////////////////////////////////////////
    //                리더 관련                   //
    //////////////////////////////////////////////

    /**
     * 전체 리더조회
     * @return
     */
    @GetMapping("/reader/list")
    public  ResponseEntity<?> searchAllReader() {
        List<ReaderListResponseDto> readerList = readerService.searchAllReader();
//        log.info("readerListsize : {}", readerList.size());
//        log.info("readerList : {}", readerList.get(0).getMemberId());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SEARCH_ALL_READER, readerList);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);

    }

    /**
     * 리더 프로필 상세
     * @param readerId
     * @return
     */
    @GetMapping("/reader/detail/{readerId}")
    public ResponseEntity<?> readerDetail(@Valid @PathVariable long readerId) {
//        log.info("readerId : {}", readerId);
        ReaderDetatilResponseDto readerDetatilResponseDto = readerService.searchReaderDetail(readerId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SEARCH_READER_DETAIL, readerDetatilResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 금주의 TOP 리더
     * 기준은 상담횟수, 최대 10명
     * @return SearchTopReaderResponseDto
     */

    ///////////////////////////////////////////////
    //                리더 찜 관련                //
    //////////////////////////////////////////////

    /**
     * 리더 찜하기
     * @param favoriteReaderRequestDto
     * @return
     */
    @PostMapping("/favorite/reader")
    public  ResponseEntity<?> addFavoriteReader(@Valid @RequestBody FavoriteReaderRequestDto favoriteReaderRequestDto){
        favoriteReaderService.addFavoriteReader(favoriteReaderRequestDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.FAVORITE_READER_ADD);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 시커 입장 찜 내역 전체 조회
     * @param request
     * @return
     */
    @GetMapping("/favorite/list")
    public ResponseEntity<?> searchFavoriteReader(HttpServletRequest request) {
        FavoriteReaderListResponseDto favoriteReaderListResponseDto = favoriteReaderService.searchFavoriteReader(request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SEARCH_ALL_FAVORITE_READER, favoriteReaderListResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 찜한 리더 삭제
     * @param request
     * @param readerId
     * @return
     */
    @DeleteMapping("/favorite/{readerId}")
    public ResponseEntity<?> deleteFavoriteReader(HttpServletRequest request, @PathVariable long readerId) {
        log.info("{}", readerId);
        favoriteReaderService.deleteFavoriteReader(request, readerId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.DELELTE_FAVORITE_READER);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    ///////////////////////////////////////////////
    //              마이페이지 관련                //
    //////////////////////////////////////////////

    /**
     * 시커 마이페이지
     * @param isReader
     * @param name
     * @param request
     * @return
     */
    @GetMapping("/seeker/mypage")
    public ResponseEntity<?> seekerMypage(@RequestParam boolean isReader, @RequestParam String name, HttpServletRequest request) {
        MypageRequestDto seekerMypageRequestDto = MypageRequestDto.builder()
                .isReader(isReader)
                .name(name)
                .build();
        SeekerMypageResponseDto seekerMypageResponseDto = memberService.seekerMypage(request, seekerMypageRequestDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SEARCH_SEEKER_MYPAGE, seekerMypageResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 리더 마이페이지
     * @param readerMypageRequestDto
     * @param request
     * @return
     */
    @GetMapping("/reader/mypage")
    public ResponseEntity<?> readerMypage(@Valid @RequestBody MypageRequestDto readerMypageRequestDto, HttpServletRequest request) {
        ReaderMypageResponseDto readerMypageResponseDto = memberService.readerMypage(request, readerMypageRequestDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SEARCH_READER_MYPAGE, readerMypageResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * TOP 리더 송출
     * @return List<TopReaderResponseDto>
     */
    @GetMapping("/reader/top")
    public ResponseEntity<ResultResponse> readerTop() {
        List<TopReaderResponseDto> topReaderResponseDtoList = readerService.searchTopReader();
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SEARCH_TOP_READER, topReaderResponseDtoList);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
