package com.ssafy.tarotbom.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReader is a Querydsl query type for Reader
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReader extends EntityPathBase<Reader> {

    private static final long serialVersionUID = 848222419L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReader reader = new QReader("reader");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail grade;

    public final StringPath gradeCode = createString("gradeCode");

    public final StringPath intro = createString("intro");

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail keyword;

    public final StringPath keywords = createString("keywords");

    public final QMember member;

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Double> rating = createNumber("rating", Double.class);

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public QReader(String variable) {
        this(Reader.class, forVariable(variable), INITS);
    }

    public QReader(Path<? extends Reader> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReader(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReader(PathMetadata metadata, PathInits inits) {
        this(Reader.class, metadata, inits);
    }

    public QReader(Class<? extends Reader> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.grade = inits.isInitialized("grade") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("grade")) : null;
        this.keyword = inits.isInitialized("keyword") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("keyword")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

