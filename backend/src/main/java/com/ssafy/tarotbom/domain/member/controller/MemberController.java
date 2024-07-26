package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.Service.MemberService;
import com.ssafy.tarotbom.domain.member.dto.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.SignupReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
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
    public ResponseEntity<BasicMessageDto> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){
        BasicMessageDto result = memberService.login(loginReqDto, response);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PostMapping("/signup")
    public ResponseEntity<BasicMessageDto> signup(@Valid @RequestBody SignupReqDto signupReqDto, HttpServletResponse response){
        BasicMessageDto result = memberService.signup(signupReqDto, response)
                .orElse;
        return new ResponseEntity<>(result, HttpStatus.OK);

    }


}
