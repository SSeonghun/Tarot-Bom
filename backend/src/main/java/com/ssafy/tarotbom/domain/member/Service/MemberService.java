package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.request.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.request.MypageRequestDto;
import com.ssafy.tarotbom.domain.member.dto.request.ReaderJoinRequestDto;
import com.ssafy.tarotbom.domain.member.dto.request.SignupReqDto;
import com.ssafy.tarotbom.domain.member.dto.response.LoginResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderMypageResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.SeekerMypageResponseDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public interface MemberService{
    LoginResponseDto login(LoginReqDto loginReqDto, HttpServletResponse response);
    boolean signup(SignupReqDto signupReqDto);
    boolean sendCodeToEmail(String toEmail);
    boolean verifyCode(String code, String authCode);
    Cookie createAceessToken(LoginReqDto loginReqDto, HttpServletResponse response, HttpServletRequest request);

    void readerJoin(ReaderJoinRequestDto readerJoinRequestDto);

    Cookie changeAccessToken(HttpServletRequest request);

    SeekerMypageResponseDto seekerMypage(HttpServletRequest request, MypageRequestDto seekerMypageRequestDto);

    ReaderMypageResponseDto readerMypage(HttpServletRequest request, MypageRequestDto readerMypageReqeusetDto);

    void logout(HttpServletRequest request);
}