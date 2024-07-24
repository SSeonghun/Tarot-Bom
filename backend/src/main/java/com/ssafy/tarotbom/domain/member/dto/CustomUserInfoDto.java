package com.ssafy.tarotbom.domain.member.dto;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class CustomUserInfoDto {
    private long memberId;
    private String nickname;
    private String email;
    private String password;
    private CodeDetail memberType;
}
