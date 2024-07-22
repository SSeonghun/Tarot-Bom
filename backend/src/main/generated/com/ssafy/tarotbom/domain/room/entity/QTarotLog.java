package com.ssafy.tarotbom.domain.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTarotLog is a Querydsl query type for TarotLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTarotLog extends EntityPathBase<TarotLog> {

    private static final long serialVersionUID = 2103441707L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTarotLog tarotLog = new QTarotLog("tarotLog");

    public final NumberPath<Long> logId = createNumber("logId", Long.class);

    public final QRoom roomId;

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember userId;

    public QTarotLog(String variable) {
        this(TarotLog.class, forVariable(variable), INITS);
    }

    public QTarotLog(Path<? extends TarotLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTarotLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTarotLog(PathMetadata metadata, PathInits inits) {
        this(TarotLog.class, metadata, inits);
    }

    public QTarotLog(Class<? extends TarotLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.roomId = inits.isInitialized("roomId") ? new QRoom(forProperty("roomId"), inits.get("roomId")) : null;
        this.userId = inits.isInitialized("userId") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("userId"), inits.get("userId")) : null;
    }

}

