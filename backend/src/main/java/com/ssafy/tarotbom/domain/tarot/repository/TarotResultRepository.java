package com.ssafy.tarotbom.domain.tarot.repository;

import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarotResultRepository extends JpaRepository<TarotResult, Long> {
    public <S extends TarotResult> S save(S tarotResult);
    public TarotResult findByResultId(Long resultId);
}
