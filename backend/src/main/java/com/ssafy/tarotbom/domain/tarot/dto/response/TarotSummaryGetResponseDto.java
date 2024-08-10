package com.ssafy.tarotbom.domain.tarot.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class TarotSummaryGetResponseDto {
    private long cardId;
    private String cardName;
    private String description;
    private String imageUrl;
    private String content;
    private LocalDateTime createTime;
}
