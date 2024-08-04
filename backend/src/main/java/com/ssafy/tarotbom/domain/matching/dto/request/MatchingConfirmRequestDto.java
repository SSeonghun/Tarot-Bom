package com.ssafy.tarotbom.domain.matching.dto.request;

import lombok.Getter;

@Getter
public class MatchingConfirmRequestDto {
    private long memberId;
    private long candidateId;
}
