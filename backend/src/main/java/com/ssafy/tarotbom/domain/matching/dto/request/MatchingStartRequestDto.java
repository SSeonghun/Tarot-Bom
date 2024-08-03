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
    private String memberType;
    private long memberId;
}
