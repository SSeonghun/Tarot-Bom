package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.Service.MemberService;
import com.ssafy.tarotbom.domain.member.dto.request.EmailCheckReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.EmailReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.SignupReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.result.ResultCode;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class MemberController {

    private final MemberService memberService;

    /*
    @GetMapping("/test")
    public String test(){
        return "test";
    }
    */

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){
        if(memberService.login(loginReqDto, response)) {
            return ResponseEntity.status(ResultCode.LOGIN_OK.getStatus()).body(null);
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
        memberService.verifyCode(emailcheckReqDto.getEmail(), emailcheckReqDto.getVerificationCode());
        if(memberService.verifyCode(emailcheckReqDto.getEmail(), emailcheckReqDto.getVerificationCode())){
            return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(null);
        }else {
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto){
        if(memberService.signup(signupReqDto)) {
            return ResponseEntity.status(ResultCode.SIGNUP_OK.getStatus()).body(null);
        }else{
            return ResponseEntity.status(ErrorCode.COMMON_NOT_FOUND.getStatus()).body(null);
        }
    }

}
