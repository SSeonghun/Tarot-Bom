package com.ssafy.tarotbom.domain.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReservation is a Querydsl query type for Reservation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReservation extends EntityPathBase<Reservation> {

    private static final long serialVersionUID = -1914370020L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReservation reservation = new QReservation("reservation");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail keyword;

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember reader;

    public final NumberPath<Long> readerId = createNumber("readerId", Long.class);

    public final NumberPath<Long> reservationId = createNumber("reservationId", Long.class);

    public final com.ssafy.tarotbom.domain.room.entity.QRoom room;

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember seeker;

    public final NumberPath<Long> seekerId = createNumber("seekerId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail status;

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public QReservation(String variable) {
        this(Reservation.class, forVariable(variable), INITS);
    }

    public QReservation(Path<? extends Reservation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReservation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReservation(PathMetadata metadata, PathInits inits) {
        this(Reservation.class, metadata, inits);
    }

    public QReservation(Class<? extends Reservation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.keyword = inits.isInitialized("keyword") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("keyword")) : null;
        this.reader = inits.isInitialized("reader") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reader"), inits.get("reader")) : null;
        this.room = inits.isInitialized("room") ? new com.ssafy.tarotbom.domain.room.entity.QRoom(forProperty("room"), inits.get("room")) : null;
        this.seeker = inits.isInitialized("seeker") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("seeker"), inits.get("seeker")) : null;
        this.status = inits.isInitialized("status") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("status")) : null;
    }

}

