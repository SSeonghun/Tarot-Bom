package com.ssafy.tarotbom.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavoriteReader is a Querydsl query type for FavoriteReader
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavoriteReader extends EntityPathBase<FavoriteReader> {

    private static final long serialVersionUID = 560847247L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavoriteReader favoriteReader = new QFavoriteReader("favoriteReader");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> favoriteId = createNumber("favoriteId", Long.class);

    public final QReader reader;

    public final NumberPath<Long> readerId = createNumber("readerId", Long.class);

    public final QMember seeker;

    public final NumberPath<Long> seekerId = createNumber("seekerId", Long.class);

    public QFavoriteReader(String variable) {
        this(FavoriteReader.class, forVariable(variable), INITS);
    }

    public QFavoriteReader(Path<? extends FavoriteReader> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavoriteReader(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavoriteReader(PathMetadata metadata, PathInits inits) {
        this(FavoriteReader.class, metadata, inits);
    }

    public QFavoriteReader(Class<? extends FavoriteReader> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reader = inits.isInitialized("reader") ? new QReader(forProperty("reader"), inits.get("reader")) : null;
        this.seeker = inits.isInitialized("seeker") ? new QMember(forProperty("seeker"), inits.get("seeker")) : null;
    }

}

