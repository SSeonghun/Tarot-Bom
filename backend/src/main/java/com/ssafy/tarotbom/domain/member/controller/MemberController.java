package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.Service.MemberService;
import com.ssafy.tarotbom.domain.member.dto.request.EmailCheckReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.EmailReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.SignupReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import com.ssafy.tarotbom.global.dto.LoginResponseDto;
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
@CrossOrigin(origins = "http://localhost:3000") // 허용할 출처 설정
public class MemberController {

    private final MemberService memberService;

    /*
    @GetMapping("/test")
    public String test(){
        return "test";
    }
    */

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){

        log.info("loginReqDte : {}", loginReqDto.getEmail());

        LoginResponseDto result = memberService.login(loginReqDto, response);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/emails/verifications")
    public ResponseEntity<BasicMessageDto> sendMessage(@Valid @RequestBody EmailReqDto emailReqDto){
        BasicMessageDto result = memberService.sendCodeToEmail(emailReqDto.getEmail());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/emails/verifications")
    public ResponseEntity<BasicMessageDto> verifyCode(@Valid @RequestBody EmailCheckReqDto emailcheckReqDto){
        BasicMessageDto result;
        if(memberService.verifyCode(emailcheckReqDto.getEmail(), emailcheckReqDto.getVerificationCode())){
            return new ResponseEntity<>( new BasicMessageDto("인증 성공"), HttpStatus.OK);
        }else {
            return new ResponseEntity<>( new BasicMessageDto("인증 실패"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<BasicMessageDto> signup(@Valid @RequestBody SignupReqDto signupReqDto){

        log.info("SingupDto : {}", signupReqDto.getEmail());

        BasicMessageDto result = memberService.signup(signupReqDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
