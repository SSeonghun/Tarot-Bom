package com.ssafy.tarotbom.global.dto;

import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDto {
    private String message;
    private Cookie accessTokenCookie;
    private Cookie refreshTokenCookie;
}
