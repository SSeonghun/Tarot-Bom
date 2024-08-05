package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.Service.FavoriteReaderService;
import com.ssafy.tarotbom.domain.member.Service.MemberService;
import com.ssafy.tarotbom.domain.member.Service.ReaderService;
import com.ssafy.tarotbom.domain.member.dto.request.*;
import com.ssafy.tarotbom.domain.member.dto.response.*;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.result.ResultCode;
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
@CrossOrigin(origins = "http://localhost:3000") // 허용할 출처 설정
public class MemberController {

    private final MemberService memberService;
    private final ReaderService readerService;
    private final FavoriteReaderService favoriteReaderService;

    /*
    @GetMapping("/test")
    public String test(){
        return "test";
    }
    */

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){
        LoginResponseDto result = memberService.login(loginReqDto, response);

        return ResponseEntity.status(ResultCode.LOGIN_OK.getStatus()).body(result);
    }

    @PostMapping("/emails/verifications")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody EmailReqDto emailReqDto){
        if(memberService.sendCodeToEmail(emailReqDto.getEmail())){
            return ResponseEntity.status(ResultCode.EMAIL_SEND_OK.getStatus()).body(null);
        }else{
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

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

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body("만들기 성공");
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

        return ResponseEntity.status(ResultCode.LOGIN_OK.getStatus()).body("Access token successfully updated.");
    }

    /////////////// 리더 검색 /////////////////

    /**
     * 전체 리더조회
     * @return
     */
    @GetMapping("/reader/list")
    public  ResponseEntity<?> searchAllReader() {
        List<ReaderListResponseDto> readerList = readerService.searchAllReader();

        log.info("readerListsize : {}", readerList.size());
        log.info("readerList : {}", readerList.get(0).getMemberId());

        // 리스트를 정상적으로 반환하도록 수정
        try{

        if (readerList.isEmpty()) {
            return ResponseEntity.noContent().build(); // 데이터가 없을 경우 No Content 응답
        }
            return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(readerList); // 데이터가 있을 경우 OK 응답
        } catch (Exception e) {
            log.error("{}", e);
            return null;
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout (HttpServletRequest request) {

        memberService.logout(request);

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body("로그아웃 성공");
    }

    /**
     * 리더 프로필 상세
     * @param readerId
     * @return
     */
    @GetMapping("/reader/detail/{readerId}")
    public ResponseEntity<?> readerDetail(@Valid @PathVariable long readerId) {

        log.info("readerId : {}", readerId);


        ReaderDetatilResponseDto readerDetatilResponseDto = readerService.searchReaderDetail(readerId);

        if (readerDetatilResponseDto != null) {
            // 리더 정보를 성공적으로 가져온 경우
            return ResponseEntity.ok(readerDetatilResponseDto);
        } else {
            // 리더 정보를 찾지 못한 경우 (404 Not Found)
            return ResponseEntity.notFound().build();
        }
    }

    /////////////// 리더 찜 관련 /////////////////

    /**
     * 리더 찜하기
     * @param favoriteReaderRequestDto
     * @return
     */
    @PostMapping("/favorite/reader")
    public  ResponseEntity<?> addFavoriteReader(@Valid @RequestBody FavoriteReaderRequestDto favoriteReaderRequestDto){

        favoriteReaderService.addFavoriteReader(favoriteReaderRequestDto);

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body("찜완료");
    }

    /**
     * 시커 입장 찜 내역 조회
     * @param request
     * @return
     */
    @GetMapping("/favorite/list")
    public ResponseEntity<?> searchFavoriteReader(HttpServletRequest request) {

        FavoriteReaderListResponseDto favoriteReaderListResponseDto = favoriteReaderService.searchFavoriteReader(request);

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(favoriteReaderListResponseDto);
    }

    @DeleteMapping("/favorite/{readerId}")
    public ResponseEntity<?> deleteFavoriteReader(HttpServletRequest request, @PathVariable long readerId) {

        log.info("{}", readerId);

//        long parseReaderId = Long.parseLong(readerId);

        favoriteReaderService.deleteFavoriteReader(request, readerId);

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body("삭제완료");
    }
    


    /////////////// 마이페이지 //////////////////

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
        log.info("processing , {}", seekerMypageRequestDto.isReader());

        SeekerMypageResponseDto seekerMypageResponseDto = memberService.seekerMypage(request, seekerMypageRequestDto);

        log.info("success");

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(seekerMypageResponseDto);
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
        log.info("readerMypage");

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(readerMypageResponseDto);
    }



}
