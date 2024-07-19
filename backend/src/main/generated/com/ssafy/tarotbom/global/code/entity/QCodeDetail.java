package com.ssafy.tarotbom.global.code.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCodeDetail is a Querydsl query type for CodeDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCodeDetail extends EntityPathBase<CodeDetail> {

    private static final long serialVersionUID = 967074242L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCodeDetail codeDetail = new QCodeDetail("codeDetail");

    public final NumberPath<Long> codeDetailId = createNumber("codeDetailId", Long.class);

    public final QCodeType codeType;

    public final StringPath detailDesc = createString("detailDesc");

    public QCodeDetail(String variable) {
        this(CodeDetail.class, forVariable(variable), INITS);
    }

    public QCodeDetail(Path<? extends CodeDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCodeDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCodeDetail(PathMetadata metadata, PathInits inits) {
        this(CodeDetail.class, metadata, inits);
    }

    public QCodeDetail(Class<? extends CodeDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.codeType = inits.isInitialized("codeType") ? new QCodeType(forProperty("codeType")) : null;
    }

}

