package com.ssafy.tarotbom.domain.tarot.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TarotResultCardResponseDto {
    private int cardId;
    private String cardName;
    private String description;
    private String imageUrl;
    private int sequence;
    private String direction;

}
