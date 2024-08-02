package com.ssafy.tarotbom.domain.tarot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TarotResultCardDto {
    private int cardId;
    private int sequence;
    private String direction;
}
