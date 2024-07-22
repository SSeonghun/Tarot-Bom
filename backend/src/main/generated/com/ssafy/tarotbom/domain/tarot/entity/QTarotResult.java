package com.ssafy.tarotbom.domain.tarot.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTarotResult is a Querydsl query type for TarotResult
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTarotResult extends EntityPathBase<TarotResult> {

    private static final long serialVersionUID = -2084993319L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTarotResult tarotResult = new QTarotResult("tarotResult");

    public final ListPath<TarotResultCard, QTarotResultCard> cardList = this.<TarotResultCard, QTarotResultCard>createList("cardList", TarotResultCard.class, QTarotResultCard.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail keyword;

    public final StringPath memo = createString("memo");

    public final StringPath music = createString("music");

    public final com.ssafy.tarotbom.domain.member.entity.QMember reader;

    public final NumberPath<Long> resultId = createNumber("resultId", Long.class);

    public final com.ssafy.tarotbom.domain.room.entity.QRoom room;

    public final com.ssafy.tarotbom.domain.member.entity.QMember seeker;

    public final StringPath summary = createString("summary");

    public QTarotResult(String variable) {
        this(TarotResult.class, forVariable(variable), INITS);
    }

    public QTarotResult(Path<? extends TarotResult> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTarotResult(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTarotResult(PathMetadata metadata, PathInits inits) {
        this(TarotResult.class, metadata, inits);
    }

    public QTarotResult(Class<? extends TarotResult> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.keyword = inits.isInitialized("keyword") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("keyword")) : null;
        this.reader = inits.isInitialized("reader") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reader"), inits.get("reader")) : null;
        this.room = inits.isInitialized("room") ? new com.ssafy.tarotbom.domain.room.entity.QRoom(forProperty("room"), inits.get("room")) : null;
        this.seeker = inits.isInitialized("seeker") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("seeker"), inits.get("seeker")) : null;
    }

}

