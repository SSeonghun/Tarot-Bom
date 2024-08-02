package com.ssafy.tarotbom.domain.member.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private String name;
    private String email;
    private boolean isReader;
}
