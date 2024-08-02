package com.ssafy.tarotbom.domain.tarot.repository;

import com.ssafy.tarotbom.domain.tarot.entity.TarotResultCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TarotResultCardRepository extends JpaRepository<TarotResultCard, Long> {
    public <S extends TarotResultCard> List<S> saveAll(Iterable<S> tarotResultCards);
}
