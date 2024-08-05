package com.ssafy.tarotbom.domain.matching.dto.request;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import lombok.Getter;

@Getter
public class MatchingCancelRequestDto {
    private long memberId;
    private MatchingInfoDto memberDto;
}
