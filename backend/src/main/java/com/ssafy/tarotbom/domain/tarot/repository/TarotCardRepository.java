package com.ssafy.tarotbom.domain.tarot.repository;

import com.ssafy.tarotbom.domain.tarot.entity.TarotCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarotCardRepository extends JpaRepository<TarotCard, Long> {
    public TarotCard findByCardId(int cardId);
}
