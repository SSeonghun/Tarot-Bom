package com.ssafy.tarotbom.domain.tarot.repository;

import com.ssafy.tarotbom.domain.tarot.entity.TarotSummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarotSummaryRepository extends JpaRepository<TarotSummary, Integer> {
    public <S extends TarotSummary> S save(S entity);
    public TarotSummary findByMemberId(long memberId);
}
