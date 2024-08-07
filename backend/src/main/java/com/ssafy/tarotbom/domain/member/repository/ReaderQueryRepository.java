package com.ssafy.tarotbom.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tarotbom.domain.member.entity.QReader;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.tarot.entity.QTarotResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReaderQueryRepository {
    private final JPAQueryFactory queryFactory;
    public List<Reader> findTopReader() {
        QReader reader = QReader.reader;
        QTarotResult tarotResult = QTarotResult.tarotResult;
        List<Long> topReaderIds = queryFactory
                .select(reader.memberId)
                .from(tarotResult)
                .join(reader).on(tarotResult.readerId.eq(reader.memberId))
                .groupBy(reader.memberId)
                .orderBy(tarotResult.readerId.count().desc())
                .limit(10)
                .fetch();

        return queryFactory
                .selectFrom(reader)
                .where(reader.memberId.in(topReaderIds))
                .fetch();
    }
}
