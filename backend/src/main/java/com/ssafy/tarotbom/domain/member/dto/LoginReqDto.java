package com.ssafy.tarotbom.domain.member.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginReqDto {

    @NotNull(message = "이메일 입력은 필수입니다.")
    @Email
    private String email;

    @NotNull(message = "패스워드 입력은 필수입니다.")
    private String password;



}
