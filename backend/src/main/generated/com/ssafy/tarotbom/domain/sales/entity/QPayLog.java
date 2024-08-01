package com.ssafy.tarotbom.domain.sales.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPayLog is a Querydsl query type for PayLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPayLog extends EntityPathBase<PayLog> {

    private static final long serialVersionUID = -299198036L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPayLog payLog = new QPayLog("payLog");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> payLogId = createNumber("payLogId", Long.class);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember reader;

    public final com.ssafy.tarotbom.domain.member.entity.QMember seeker;

    public QPayLog(String variable) {
        this(PayLog.class, forVariable(variable), INITS);
    }

    public QPayLog(Path<? extends PayLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPayLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPayLog(PathMetadata metadata, PathInits inits) {
        this(PayLog.class, metadata, inits);
    }

    public QPayLog(Class<? extends PayLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reader = inits.isInitialized("reader") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reader"), inits.get("reader")) : null;
        this.seeker = inits.isInitialized("seeker") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("seeker"), inits.get("seeker")) : null;
    }

}

