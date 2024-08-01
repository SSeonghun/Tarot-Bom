package com.ssafy.tarotbom.domain.room.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tarotbom.domain.reservation.entity.QReservation;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import com.ssafy.tarotbom.domain.room.entity.QRoom;
import com.ssafy.tarotbom.domain.room.entity.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RoomQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Reservation findByReservationId (long reservationId){
        QReservation res = QReservation.reservation;
        return queryFactory
                .selectFrom(res)
                .where(res.reservationId.eq(reservationId))
                .fetchOne();
    }
}
