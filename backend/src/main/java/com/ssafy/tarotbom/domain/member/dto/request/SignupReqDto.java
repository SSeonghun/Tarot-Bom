package com.ssafy.tarotbom.domain.member.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class SignupReqDto {


    private String nickname;

    @NotNull(message = "이메일은 필수 입력값입니다.")
    @Email
    private String email;

    @NotNull(message = "비밀번호는 필수 입력값입니다.")
    private String password;


}
