package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.request.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.SignupReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import jakarta.servlet.http.HttpServletResponse;


public interface MemberService{
    BasicMessageDto login(LoginReqDto loginReqDto, HttpServletResponse response);
    BasicMessageDto signup(SignupReqDto signupReqDto);
    BasicMessageDto sendCodeToEmail(String toEmail);
    boolean verifyCode(String code, String authCode);
}