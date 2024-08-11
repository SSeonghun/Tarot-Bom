package com.ssafy.tarotbom.domain.reservation.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tarotbom.domain.reservation.dto.response.FindReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.entity.QReservation;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReservationQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final QReservation reservation = QReservation.reservation;
    public List<Reservation> findFilter(String memberType, long memberId) {
        return queryFactory
                .selectFrom(reservation)
                .where(setMemberType(memberType, memberId).and(reservation.statusCode.ne("R04")))
                .fetch();
    }
    public List<FindReservationResponseDto> findPossibleReservation(long readerId) {
        return queryFactory
                .select(Projections.bean(FindReservationResponseDto.class,
                        reservation.reservationId,
                        reservation.startTime))
                .from(reservation)
                .where(
                        reservation.readerId.eq(readerId).and(
                                reservation.statusCode.eq("R01")
                        )
                )
                .orderBy(reservation.startTime.asc())
                .fetch();
    }

    private BooleanExpression setMemberType(String memberType, long memberId) {
        if(memberType.equals("M01")) {
            return reservation.seekerId.eq(memberId);
        } else if(memberType.equals("M02")) {
            return reservation.readerId.eq(memberId);
        } else {
            return null;
        }
    }
}
