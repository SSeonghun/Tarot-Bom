package com.ssafy.tarotbom.domain.member.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String profileUrl;
    private boolean isReader;
}
