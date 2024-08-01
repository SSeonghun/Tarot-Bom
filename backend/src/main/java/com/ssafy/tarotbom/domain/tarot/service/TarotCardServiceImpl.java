package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.response.TarotCardInfoResponseDto;
import com.ssafy.tarotbom.domain.tarot.entity.TarotCard;
import com.ssafy.tarotbom.domain.tarot.repository.TarotCardRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TarotCardServiceImpl implements TarotCardService {
    private final TarotCardRepository tarotCardRepository;

    @Override
    public TarotCardInfoResponseDto getTarotCardInfo(int cardId) {
        TarotCard card = tarotCardRepository.findByCardId(cardId);
        if(card == null) { // 찾을 수 없었다면 error를 던짐
            throw new BusinessException(ErrorCode.TAROT_CARD_INFO_NOT_FOUND);
        }
        TarotCardInfoResponseDto dto = TarotCardInfoResponseDto.builder()
                .cardName(card.getCardName())
                .description(card.getDescription())
                .imageUrl(card.getImageUrl())
                .build();
        return dto;
    }
}
