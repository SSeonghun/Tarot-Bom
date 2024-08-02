package com.ssafy.tarotbom.domain.tarot.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TarotCardInfoResponseDto {
    private String cardName;
    private String description;
    private String imageUrl;
}
