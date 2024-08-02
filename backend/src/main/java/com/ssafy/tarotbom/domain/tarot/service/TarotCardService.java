package com.ssafy.tarotbom.domain.tarot.service;


import com.ssafy.tarotbom.domain.tarot.dto.response.TarotCardInfoResponseDto;

public interface TarotCardService {
    public TarotCardInfoResponseDto getTarotCardInfo(int cardId);
}
