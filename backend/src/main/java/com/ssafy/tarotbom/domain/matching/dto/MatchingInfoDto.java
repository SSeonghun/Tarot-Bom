package com.ssafy.tarotbom.domain.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchingInfoDto {
    private String keyword;
    private String roomStyle;
    private LocalDateTime matchedTime;
    private String memberType;
    private String memberId;
}
