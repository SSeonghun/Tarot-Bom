package com.ssafy.tarotbom.domain.member.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginReqDto {

    private Long memberId;
    private String email;
    private String password;



}
