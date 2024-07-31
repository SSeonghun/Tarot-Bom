package com.ssafy.tarotbom.domain.member.jwt;

import com.ssafy.tarotbom.domain.member.Service.TokenService;
import com.ssafy.tarotbom.domain.member.dto.request.CustomUserInfoDto;
import com.ssafy.tarotbom.global.security.CustomUserDetails;
import com.ssafy.tarotbom.global.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = getJwtFromCookies(request, "accessToken");
        String refreshToken = getJwtFromCookies(request, "refreshToken");

        // 액세스 토큰 검증
        if (accessToken != null && jwtUtil.validateToken(accessToken)) {
            Long memberId = jwtUtil.getMemberId(accessToken);

            // 유저와 토큰 일치 시 CustomUserDetails 생성
            CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(String.valueOf(memberId));

            if (userDetails != null) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } else if (refreshToken != null && jwtUtil.validateToken(refreshToken)) {
            Long memberIdFromRefreshToken = jwtUtil.getMemberId(refreshToken);

            // 레디스에서 저장된 리프레시 토큰과 비교
            String storedRefreshToken = tokenService.getRefreshToken(memberIdFromRefreshToken);
            if (refreshToken.equals(storedRefreshToken)) {
                // 액세스 토큰 재발급
                CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(String.valueOf(memberIdFromRefreshToken));
                String newAccessToken = jwtUtil.createAccessToken(CustomUserInfoDto.builder()
                        .memberId(userDetails.getMemberId())
                        .email(userDetails.getEmail())
                        .memberType(userDetails.getMemberType())
                        .build());

                Cookie newAccessTokenCookie = new Cookie("accessToken", newAccessToken);
                newAccessTokenCookie.setHttpOnly(true);
                newAccessTokenCookie.setSecure(true);
                newAccessTokenCookie.setPath("/");
                newAccessTokenCookie.setMaxAge(60 * 60); // 1시간

                response.addCookie(newAccessTokenCookie);
            }
        }

        else {
//            response.sendRedirect("localhost/tarotbom/user/login"); // 로그인 페이지로 리다이렉트
//            return; // 더 이상 필터 체인을 진행하지 않도록 조기 반환
        }

        filterChain.doFilter(request, response); // 다음 필터로 넘기기
    }

    private String getJwtFromCookies(HttpServletRequest request, String tokenName) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            log.warn("No cookies found in the request");
            return null;
        }

        for (Cookie cookie : cookies) {
            if (tokenName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
}
