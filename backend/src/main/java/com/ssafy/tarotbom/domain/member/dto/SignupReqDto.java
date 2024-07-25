package com.ssafy.tarotbom.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupReqDto {
    // 닉네임, 이메일, 비밀번호
    private String nickname;

    private String email;

    private String password;


}
