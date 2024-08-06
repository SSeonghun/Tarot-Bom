package com.ssafy.tarotbom.domain.tarot.repository;

import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarotResultRepository extends JpaRepository<TarotResult, Long> {
    public <S extends TarotResult> S save(S tarotResult);
    public TarotResult findByResultId(Long resultId);
    public List<TarotResult> findAllBySeekerId(Long seekerId);
    public List<TarotResult> findAllByReaderId(Long readerId);
    public int countByReaderId(Long readerId);
}
