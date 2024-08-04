package com.ssafy.tarotbom.domain.matching.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MatchingResponseDto {
    private MatchingResponseType responseType;
    private String message;
    private Object data;
}
