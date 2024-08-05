package com.ssafy.tarotbom.global.config;


//import com.ssafy.tarotbom.domain.jwt.JwtUtil;
import com.ssafy.tarotbom.domain.member.Service.TokenService;
import com.ssafy.tarotbom.domain.member.jwt.JwtAuthFilter;
import com.ssafy.tarotbom.domain.member.jwt.JwtUtil;
import com.ssafy.tarotbom.global.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity // 스프링 security 지원을 가능하게 하는 기능
@EnableGlobalMethodSecurity(securedEnabled = true) // @Secured 어노테이션 활성화
public class WebSecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final TokenService tokenService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomUserDetailsService customUserDetailsService) throws Exception {

        http.csrf((csrf) -> csrf.disable());        // CSRF 비활성화 -> JWT 쓰기 때문에
        http.cors(Customizer.withDefaults());        // CORS 기본값으로 활성


        // 세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 해주거나 사용하지 않음
        http.sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        // FormLogin, BasicHttp 비활성화
        http.formLogin((form) -> form.disable());
        http.httpBasic(AbstractHttpConfigurer::disable);

        // JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(new JwtAuthFilter(customUserDetailsService, jwtUtil, tokenService), UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling((exceptionHandling) -> exceptionHandling
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .accessDeniedHandler(new AccessDeniedHandlerImpl())
        );

        // 권한 규칙 : login, signup 경로는 직접 service에서 인증처리 나머지는 여기서 인증
        // -> main경로도 추가해야하나?
        http.authorizeHttpRequests((authorizeRequests) -> {
            authorizeRequests.requestMatchers("/user/signup/**").permitAll() // 회원가입 api
                    .requestMatchers("/user/login/**").permitAll() // 로그인 api
                    .requestMatchers("/user/emailCheck/**").permitAll()
                    .requestMatchers("/user/emails/**").permitAll() // 이메일 중복 검사
//                    .requestMatchers("/**").permitAll()
                    .requestMatchers("/error/**").authenticated()
                    .anyRequest().authenticated(); // 위의 것 외에는 인증 없이 접근 불가
        });

        return http.build();
    }


}
