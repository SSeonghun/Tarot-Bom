package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.SignupReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface MemberService{
    BasicMessageDto login(LoginReqDto loginReqDto, HttpServletResponse response);
    BasicMessageDto signup(SignupReqDto signupReqDto);
    BasicMessageDto sendCodeToEmail(String toEmail);
    boolean verifyCode(String code, String authCode);
}