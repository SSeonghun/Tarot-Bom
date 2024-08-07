package com.ssafy.tarotbom.domain.notification.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNotification is a Querydsl query type for Notification
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNotification extends EntityPathBase<Notification> {

    private static final long serialVersionUID = -250777076L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNotification notification = new QNotification("notification");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final BooleanPath isRead = createBoolean("isRead");

    public final BooleanPath isValid = createBoolean("isValid");

    public final com.ssafy.tarotbom.domain.member.entity.QMember member;

    public final NumberPath<Long> noId = createNumber("noId", Long.class);

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail noType;

    public QNotification(String variable) {
        this(Notification.class, forVariable(variable), INITS);
    }

    public QNotification(Path<? extends Notification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNotification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNotification(PathMetadata metadata, PathInits inits) {
        this(Notification.class, metadata, inits);
    }

    public QNotification(Class<? extends Notification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
        this.noType = inits.isInitialized("noType") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("noType")) : null;
    }

}

