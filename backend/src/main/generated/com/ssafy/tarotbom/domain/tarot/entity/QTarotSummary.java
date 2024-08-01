package com.ssafy.tarotbom.domain.tarot.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTarotSummary is a Querydsl query type for TarotSummary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTarotSummary extends EntityPathBase<TarotSummary> {

    private static final long serialVersionUID = 1129496682L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTarotSummary tarotSummary = new QTarotSummary("tarotSummary");

    public final QTarotCard card;

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember member;

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public QTarotSummary(String variable) {
        this(TarotSummary.class, forVariable(variable), INITS);
    }

    public QTarotSummary(Path<? extends TarotSummary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTarotSummary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTarotSummary(PathMetadata metadata, PathInits inits) {
        this(TarotSummary.class, metadata, inits);
    }

    public QTarotSummary(Class<? extends TarotSummary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.card = inits.isInitialized("card") ? new QTarotCard(forProperty("card")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

