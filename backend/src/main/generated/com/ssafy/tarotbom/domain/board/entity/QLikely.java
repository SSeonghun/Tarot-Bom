package com.ssafy.tarotbom.domain.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikely is a Querydsl query type for Likely
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikely extends EntityPathBase<Likely> {

    private static final long serialVersionUID = -1196665874L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikely likely = new QLikely("likely");

    public final QBoard board;

    public final NumberPath<Long> likelyId = createNumber("likelyId", Long.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember member;

    public QLikely(String variable) {
        this(Likely.class, forVariable(variable), INITS);
    }

    public QLikely(Path<? extends Likely> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikely(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikely(PathMetadata metadata, PathInits inits) {
        this(Likely.class, metadata, inits);
    }

    public QLikely(Class<? extends Likely> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board"), inits.get("board")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

