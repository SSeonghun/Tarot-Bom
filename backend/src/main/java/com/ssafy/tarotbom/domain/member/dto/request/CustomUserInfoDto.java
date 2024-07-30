package com.ssafy.tarotbom.domain.member.dto.request;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.Getter;
import lombok.NoArgsConstructor;


// 로직 내부에서 인증 유저 정보를 저장해두는 DTO
// -> 토큰 생성, 유효성 검사 등에 필요한 정보
@Getter
@NoArgsConstructor
public class CustomUserInfoDto {
    private long memberId;
    private String nickname;
    private String email;
    private String password;
    private CodeDetail memberType;
}
