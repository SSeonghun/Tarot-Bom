package com.ssafy.tarotbom.domain.member.controller;

import com.ssafy.tarotbom.domain.member.Service.MemberService;
import com.ssafy.tarotbom.domain.member.dto.LoginReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<BasicMessageDto> login(@Valid @RequestBody LoginReqDto loginReqDto, HttpServletResponse response){
        return memberService.login(loginReqDto, response);
    }

}
