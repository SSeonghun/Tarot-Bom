package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.request.*;
import com.ssafy.tarotbom.domain.member.dto.response.LoginResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderMypageResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.SeekerMypageResponseDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;


public interface MemberService{
    LoginResponseDto login(LoginReqDto loginReqDto, HttpServletResponse response);
    void signup(SignupReqDto signupReqDto);
    void sendCodeToEmail(String toEmail);
    void verifyCode(String code, String authCode);
    void updateMember(UpdateMemberRequestDto updateMemberRequestDto, MultipartFile profileImage, HttpServletRequest request);
    Cookie createAceessToken(LoginReqDto loginReqDto, HttpServletResponse response, HttpServletRequest request);

    void readerJoin(HttpServletRequest request, ReaderJoinRequestDto readerJoinRequestDto);

    Cookie changeAccessToken(HttpServletRequest request);

    SeekerMypageResponseDto seekerMypage(HttpServletRequest request);

    ReaderMypageResponseDto readerMypage(HttpServletRequest request);

    void logout(HttpServletRequest request);
}