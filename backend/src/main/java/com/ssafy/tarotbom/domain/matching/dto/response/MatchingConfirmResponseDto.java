package com.ssafy.tarotbom.domain.matching.dto.response;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MatchingConfirmResponseDto {
    private MatchingInfoDto myDto;
    private MatchingInfoDto candidateDto;
}
