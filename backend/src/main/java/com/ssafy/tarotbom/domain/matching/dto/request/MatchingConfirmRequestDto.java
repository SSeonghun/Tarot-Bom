package com.ssafy.tarotbom.domain.matching.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import lombok.Getter;

@Getter
public class MatchingConfirmRequestDto {
    private MatchingInfoDto memberDto;
    private MatchingInfoDto candidateDto;
    private String status;
}
