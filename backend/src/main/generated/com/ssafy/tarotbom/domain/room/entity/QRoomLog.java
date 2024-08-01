package com.ssafy.tarotbom.domain.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoomLog is a Querydsl query type for RoomLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomLog extends EntityPathBase<RoomLog> {

    private static final long serialVersionUID = -200835144L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoomLog roomLog = new QRoomLog("roomLog");

    public final NumberPath<Long> logId = createNumber("logId", Long.class);

    public final QRoom room;

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember user;

    public QRoomLog(String variable) {
        this(RoomLog.class, forVariable(variable), INITS);
    }

    public QRoomLog(Path<? extends RoomLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoomLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoomLog(PathMetadata metadata, PathInits inits) {
        this(RoomLog.class, metadata, inits);
    }

    public QRoomLog(Class<? extends RoomLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room"), inits.get("room")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("user"), inits.get("user")) : null;
    }

}

