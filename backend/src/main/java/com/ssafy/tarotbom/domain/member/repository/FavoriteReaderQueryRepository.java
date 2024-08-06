package com.ssafy.tarotbom.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tarotbom.domain.member.entity.QFavoriteReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FavoriteReaderQueryRepository {
    private final JPAQueryFactory queryFactory;
    public long deleteBySeekerIdAndReaderId(long seekerId, long readerId) {
        QFavoriteReader favoriteReader = QFavoriteReader.favoriteReader;
        return queryFactory.delete(favoriteReader)
                .where(favoriteReader.readerId.eq(readerId)
                .and(favoriteReader.seekerId.eq(seekerId)))
                .execute();
    }
}
