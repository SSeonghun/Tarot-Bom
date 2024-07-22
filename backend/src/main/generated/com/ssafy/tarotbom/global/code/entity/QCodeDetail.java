package com.ssafy.tarotbom.global.code.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCodeDetail is a Querydsl query type for CodeDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCodeDetail extends EntityPathBase<CodeDetail> {

    private static final long serialVersionUID = 967074242L;

    public static final QCodeDetail codeDetail = new QCodeDetail("codeDetail");

    public final StringPath codeDetailId = createString("codeDetailId");

    public final StringPath codeTypeId = createString("codeTypeId");

    public final StringPath detailDesc = createString("detailDesc");

    public QCodeDetail(String variable) {
        super(CodeDetail.class, forVariable(variable));
    }

    public QCodeDetail(Path<? extends CodeDetail> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCodeDetail(PathMetadata metadata) {
        super(CodeDetail.class, metadata);
    }

}

