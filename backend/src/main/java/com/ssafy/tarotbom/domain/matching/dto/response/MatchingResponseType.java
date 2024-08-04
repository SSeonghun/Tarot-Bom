package com.ssafy.tarotbom.domain.matching.dto.response;

import lombok.Getter;

@Getter
public enum MatchingResponseType {
    MATCHING_ALREADY_PROCESSING,
    MATCHING_MATCHED,
    MATCHING_QUEUE_PUT,
    MATCHING_CONFIRMED

}
