package com.ssafy.tarotbom.domain.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class UpdateMemberRequestDto {
    private String nickname;
    private String password;
    private MultipartFile profileImage;
}
