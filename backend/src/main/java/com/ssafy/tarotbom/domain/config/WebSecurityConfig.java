package com.ssafy.tarotbom.domain.config;


//import com.ssafy.tarotbom.domain.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity // 스프링 security 지원을 가능하게 하는 기능
@EnableGlobalMethodSecurity(securedEnabled = true) // @Secured 어노테이션 활성화
public class WebSecurityConfig {

//    private final JwtUtil jwtUtil;

    // 비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

/*
    // test용
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers(PathRequest.toH2Console())
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf((csrf) -> csrf.disable());        // CSRF 비활성화 -> JWT 쓰기 때문에
        http.cors(Customizer.withDefaults());        // CORS 기본값으로 활성


        // 세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 해주거나 사용하지 않음
        http.sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        // 권한 규칙 : login, signup 경로는 직접 service에서 인증처리 나머지는 여기서 인증
        // -> main경로도 추가해야하나?
        http.authorizeHttpRequests((authorizeRequests) -> {
            authorizeRequests.requestMatchers("/user/signup/**").permitAll() // 회원가입 api
                    .requestMatchers("/user/emailCheck/**").permitAll() // 로그인 api
                    .anyRequest().authenticated(); // 위의 것 외에는 인증 없이 접근 불가
        }); // .addFilterBefore( filter를 적용해줘야 한다.)




        return http.build();
    }


}
