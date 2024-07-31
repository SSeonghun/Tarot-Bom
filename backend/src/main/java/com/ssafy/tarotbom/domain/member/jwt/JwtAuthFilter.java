package com.ssafy.tarotbom.domain.member.jwt;

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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Base64;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getJwtFromCookies(request);
//        String token = fulltoken.substring(7);

//        byte[] decodedBytes = Base64.getDecoder().decode(encodingtoken);
//        String token = new String(decodedBytes);

        log.info("[JwtAuthFilter-doFilterInternal] token : {}", request);
        log.info("[JwtAuthFilter-doFilterInternal] token : {}", token);



        if (token != null && jwtUtil.validateToken(token)) {
            Long memberId = jwtUtil.getMemberId(token);

            // 유저와 토큰 일치 시 UserDetails 생성
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(String.valueOf(memberId));

            if (userDetails != null) {
                // 접근 권한 인증 Token
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // 현재 Request의 Security Context에 접근 권한 설정
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(request, response); // 다음 필터로 넘기기
    }

    private String getJwtFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if(cookies == null) {
            log.warn("No cookies found in the request");
            return null;
        }

        for (Cookie cookie : cookies) {

            if("accessToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
}
