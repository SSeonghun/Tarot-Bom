package com.ssafy.tarotbom.domain.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = -1207430164L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final DateTimePath<java.time.LocalDateTime> closeDate = createDateTime("closeDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);

    public final BooleanPath isNormalClose = createBoolean("isNormalClose");

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail keyword;

    public final com.ssafy.tarotbom.domain.member.entity.QMember reader;

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final StringPath roomUrl = createString("roomUrl");

    public final com.ssafy.tarotbom.domain.member.entity.QMember seeker;

    public final StringPath worry = createString("worry");

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.keyword = inits.isInitialized("keyword") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("keyword")) : null;
        this.reader = inits.isInitialized("reader") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reader"), inits.get("reader")) : null;
        this.seeker = inits.isInitialized("seeker") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("seeker"), inits.get("seeker")) : null;
    }

}

