package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.SignupReqDto;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface MemberService{
    BasicMessageDto login(LoginReqDto loginReqDto, HttpServletResponse response);
<<<<<<< HEAD
//    BasicMessageDto signup(LoginReqDto loginReqDto, HttpServletResponse response);
=======
    BasicMessageDto signup(SignupReqDto signupReqDto);
>>>>>>> 106bf01e07a3b378b840f88e9f9ee52b266c65db
}
