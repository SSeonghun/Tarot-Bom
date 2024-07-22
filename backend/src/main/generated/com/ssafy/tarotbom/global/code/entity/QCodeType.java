package com.ssafy.tarotbom.global.code.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCodeType is a Querydsl query type for CodeType
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCodeType extends EntityPathBase<CodeType> {

    private static final long serialVersionUID = 631668971L;

    public static final QCodeType codeType = new QCodeType("codeType");

    public final NumberPath<Long> codeTypeId = createNumber("codeTypeId", Long.class);

    public final StringPath typeDesc = createString("typeDesc");

    public QCodeType(String variable) {
        super(CodeType.class, forVariable(variable));
    }

    public QCodeType(Path<? extends CodeType> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCodeType(PathMetadata metadata) {
        super(CodeType.class, metadata);
    }

}

