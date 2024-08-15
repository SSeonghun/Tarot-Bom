package com.ssafy.tarotbom.domain.member.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String profileUrl;
    private boolean isReader;
    private boolean isAdmin;

    @Override
    public String toString() {
        return "LoginResponseDto{" +
                "memberId=" + memberId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", profileUrl='" + profileUrl + '\'' +
                ", isReader=" + isReader +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
