package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.Service.MemberService;
import com.ssafy.tarotbom.domain.member.Service.ReaderService;
import com.ssafy.tarotbom.domain.member.dto.request.*;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderDetatilResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.dto.LoginResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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

    /*
    @GetMapping("/test")
    public String test(){
        return "test";
    }
    */

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){
        LoginResponseDto result = memberService.login(loginReqDto, response);

        response.addCookie(result.getAccessTokenCookie());
        response.addCookie(result.getRefreshTokenCookie());

        log.info("{}" , result.getAccessTokenCookie());
        if(result.getMessage().equals("로그인 성공")) {
            return ResponseEntity.status(ResultCode.LOGIN_OK.getStatus()).body(result);
        }else{
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

    @PostMapping("/emails/verifications")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody EmailReqDto emailReqDto){
        if(memberService.sendCodeToEmail(emailReqDto.getEmail())){
            return ResponseEntity.status(ResultCode.EMAIL_SEND_OK.getStatus()).body(null);
        }else{
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

    @PostMapping("/emails/verifications/check")
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

        return null;
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

        return null;
    }

    /**
     * 리더 프로필 상세
     * @param readerId
     * @return
     */
    @GetMapping("/reader/detail/{readerId}")
    public ResponseEntity<?> readerDetail(@Valid @PathVariable long readerId) {

        ReaderDetatilResponseDto readerDetatilResponseDto = readerService.searchReaderDetail(readerId);

        return null;
    }


    /////////////// 마이페이지 //////////////////
    @GetMapping("/seeker/mypage")
    public ResponseEntity<?> seekerMypage() {
        return null;
    }



}
