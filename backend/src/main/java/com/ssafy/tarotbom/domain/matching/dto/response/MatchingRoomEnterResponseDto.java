package com.ssafy.tarotbom.domain.matching.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MatchingRoomEnterResponseDto {
    //private String token;
    private String roomStyle;
    private long roomId;
    private String worry;
    private String keyword;
}
