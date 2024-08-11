package com.ssafy.tarotbom.domain.notification.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationGetResponseDto;
import com.ssafy.tarotbom.domain.notification.entity.QNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NotificationQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final QNotification notification = QNotification.notification;

    public List<NotificationGetResponseDto> findByMemberId(Long memberId) {
        return queryFactory
                .select(Projections.constructor(
                        NotificationGetResponseDto.class,
                        notification.noId,
                        notification.memberId,
                        notification.noTypeCode,
                        notification.content,
                        notification.isRead,
                        notification.isValid,
                        notification.createTime
                ))
                .from(notification)
                .where(notification.memberId.eq(memberId).and(
                        notification.isValid.eq(true)
                ))
                .orderBy(notification.createTime.desc())
                .fetch();
    }
}
