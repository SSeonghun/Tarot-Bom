package com.ssafy.tarotbom.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@RequiredArgsConstructor
public class CookieUtil {

    @Value("${jwt.secret}")
    private String secretKey;  // 인스턴스 변수로 변경

    // JWT에서 멤버 ID를 추출하기 위한 메서드
    public long getUserId(HttpServletRequest request) {
        // 쿠키에서 JWT 토큰을 가져옴
        String accessToken = getJwtFromCookies(request, "accessToken");

        if (accessToken != null) {
            try {
                // JWT 토큰을 파싱하여 클레임을 추출
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey)  // 인스턴스 변수 사용
                        .parseClaimsJws(accessToken)
                        .getBody();

                // 클레임에서 멤버 ID를 추출
                return Long.parseLong(claims.getSubject());
            } catch (SignatureException e) {
                // JWT 서명 오류 처리
                e.printStackTrace();
            } catch (Exception e) {
                // 기타 오류 처리
                e.printStackTrace();
            }
        }
        // 기본값 또는 예외 처리
        return -1;
    }

    // 쿠키에서 JWT 토큰을 가져오는 메서드
    private String getJwtFromCookies(HttpServletRequest request, String tokenName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (tokenName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
