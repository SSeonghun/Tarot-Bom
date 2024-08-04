package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.request.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.SignupReqDto;
import com.ssafy.tarotbom.global.dto.LoginResponseDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public interface MemberService{
    LoginResponseDto login(LoginReqDto loginReqDto, HttpServletResponse response);
    boolean signup(SignupReqDto signupReqDto);
    boolean sendCodeToEmail(String toEmail);
    boolean verifyCode(String code, String authCode);
    Cookie createAceessToken(LoginReqDto loginReqDto, HttpServletResponse response, HttpServletRequest request);
}