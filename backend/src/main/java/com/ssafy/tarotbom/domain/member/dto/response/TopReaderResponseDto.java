package com.ssafy.tarotbom.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopReaderResponseDto {
    private String nickname;
    private long readerId;
    private String intro;
    private double rating;
    private String keyword;
}
