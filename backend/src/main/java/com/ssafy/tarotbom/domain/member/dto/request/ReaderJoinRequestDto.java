package com.ssafy.tarotbom.domain.member.dto.request;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
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
public class ReaderJoinRequestDto {
    private String keyword;
    private String intro;
}
