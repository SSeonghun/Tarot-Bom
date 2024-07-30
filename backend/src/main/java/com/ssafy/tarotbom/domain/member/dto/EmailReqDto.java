package com.ssafy.tarotbom.domain.member.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
public class EmailReqDto {
    @Email
    @NotEmpty(message = "이메일을 입력해 주세요.")
    private String email;

}
