package com.ssafy.tarotbom.domain.review.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReviewReader is a Querydsl query type for ReviewReader
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReviewReader extends EntityPathBase<ReviewReader> {

    private static final long serialVersionUID = 553267209L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReviewReader reviewReader = new QReviewReader("reviewReader");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final NumberPath<Integer> rating = createNumber("rating", Integer.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember reader;

    public final com.ssafy.tarotbom.domain.tarot.entity.QTarotResult result;

    public final NumberPath<Long> reviewReaderId = createNumber("reviewReaderId", Long.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember seeker;

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public QReviewReader(String variable) {
        this(ReviewReader.class, forVariable(variable), INITS);
    }

    public QReviewReader(Path<? extends ReviewReader> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReviewReader(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReviewReader(PathMetadata metadata, PathInits inits) {
        this(ReviewReader.class, metadata, inits);
    }

    public QReviewReader(Class<? extends ReviewReader> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reader = inits.isInitialized("reader") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reader"), inits.get("reader")) : null;
        this.result = inits.isInitialized("result") ? new com.ssafy.tarotbom.domain.tarot.entity.QTarotResult(forProperty("result"), inits.get("result")) : null;
        this.seeker = inits.isInitialized("seeker") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("seeker"), inits.get("seeker")) : null;
    }

}

