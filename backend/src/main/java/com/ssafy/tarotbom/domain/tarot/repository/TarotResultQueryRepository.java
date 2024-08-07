package com.ssafy.tarotbom.domain.tarot.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tarotbom.domain.tarot.entity.QTarotResult;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TarotResultQueryRepository {
    private final JPAQueryFactory queryFactory;
    public List<TarotResult> findAllBySeekerId(long seekerId, int limit) {
        QTarotResult tarotResult = QTarotResult.tarotResult;
        return queryFactory.selectFrom(tarotResult)
                .where(tarotResult.seekerId.eq(seekerId))
                .orderBy(tarotResult.createTime.desc())
                .limit(limit)
                .fetch();
    }
    public List<TarotResult> findAllByReaderId(long readerId, int limit) {
        QTarotResult tarotResult = QTarotResult.tarotResult;
        return queryFactory.selectFrom(tarotResult)
                .where(tarotResult.readerId.eq(readerId))
                .orderBy(tarotResult.createTime.desc())
                .limit(limit)
                .fetch();
    }
}
