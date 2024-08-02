package com.ssafy.tarotbom.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@RequiredArgsConstructor
@Slf4j
public class CookieUtil {

    @Value("${jwt.secret}")
    private String secretKey;  // 인스턴스 변수로 변경

    public String getMemberEmail(HttpServletRequest request) {
        String accessToken = getJwtFromCookies(request, "accessToken");
        
        if(accessToken != null) {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)  // 인스턴스 변수 사용
                    .parseClaimsJws(accessToken)
                    .getBody();
            
            String email = getEmail(claims);
            return email;
        } else {
            return null;
        }

    }

    private String getEmail(Claims claims) {
        Object memberEmail = claims.get("email");

        if (memberEmail instanceof String) {
            return (String) memberEmail;
        } else {
            // 예상되지 않은 타입 처리
            log.error("Unexpected userId type: {}", memberEmail.getClass());
            throw new IllegalArgumentException("Invalid userId type");
        }
    }

    /**
     * JWT 에서 멤버 타입 가져오는 메서드
     * @param request
     * @return
     */
    public String getMemberType(HttpServletRequest request) {
        String accessToken = getJwtFromCookies(request, "accessToken");

        log.info("accessToken : {}", accessToken);

        if(accessToken != null) {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)  // 인스턴스 변수 사용
                    .parseClaimsJws(accessToken)
                    .getBody();

            String typeId = getTypeId(claims);
            log.info("{}", typeId);

            return typeId;
        }

        return null;
    }

    /**
     * JWT에서 ID 정보 확인
     * @param request
     * @return
     */
    public long getUserId(HttpServletRequest request) {
        // 쿠키에서 JWT 토큰을 가져옴
        String accessToken = getJwtFromCookies(request, "accessToken");

        log.info("{}", accessToken);
        log.info("secret : {}", secretKey);
        if (accessToken != null) {
            try {
                // JWT 토큰을 파싱하여 클레임을 추출
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey)  // 인스턴스 변수 사용
                        .parseClaimsJws(accessToken)
                        .getBody();

                long memberId = getId(claims);
                log.info("memberId : {}", memberId);

                return memberId;

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

    private Long getId(Claims claims) {
        Object userIdObject = claims.get("memberId");

        if (userIdObject instanceof String) {
            return Long.parseLong((String) userIdObject);
        } else if (userIdObject instanceof Integer) {
            return ((Integer) userIdObject).longValue();
        } else {
            // 예상되지 않은 타입 처리
            log.error("Unexpected userId type: {}", userIdObject.getClass());
            throw new IllegalArgumentException("Invalid userId type");
        }
    }

    private String getTypeId(Claims claims) {
        Object typeId = claims.get("memberType");

        if(typeId instanceof String) {
            return (String) typeId;
        } else {
            throw new IllegalArgumentException("Invalid userId type");
        }
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
