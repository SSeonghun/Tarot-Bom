package com.ssafy.tarotbom.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MypageRequestDto {
    private boolean reader; // 리더 가입 여부
    private String name;
}
