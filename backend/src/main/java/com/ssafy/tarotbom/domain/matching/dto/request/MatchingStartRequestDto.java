package com.ssafy.tarotbom.domain.matching.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchingStartRequestDto {
    private String keyword;
    private String roomStyle;
    // todo : 리더 쪽 매칭 시작 대응 해야 할듯 리더는 고민은 안받음 
    private String memberType;
    private long memberId;
    private String worry;
}
