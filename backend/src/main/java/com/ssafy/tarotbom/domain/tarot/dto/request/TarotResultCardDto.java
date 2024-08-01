package com.ssafy.tarotbom.domain.tarot.dto.request;

import lombok.Getter;

@Getter
public class TarotResultCardDto {
    private int cardId;
    private int sequence;
    private String direction;
}
