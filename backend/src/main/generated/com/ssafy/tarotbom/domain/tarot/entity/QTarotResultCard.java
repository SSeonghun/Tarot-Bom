package com.ssafy.tarotbom.domain.tarot.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTarotResultCard is a Querydsl query type for TarotResultCard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTarotResultCard extends EntityPathBase<TarotResultCard> {

    private static final long serialVersionUID = 1805148553L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTarotResultCard tarotResultCard = new QTarotResultCard("tarotResultCard");

    public final QTarotCard card;

    public final NumberPath<Integer> cardId = createNumber("cardId", Integer.class);

    public final NumberPath<Long> cardResultId = createNumber("cardResultId", Long.class);

    public final QTarotResult result;

    public final NumberPath<Long> resultId = createNumber("resultId", Long.class);

    public final NumberPath<Integer> sequence = createNumber("sequence", Integer.class);

    public QTarotResultCard(String variable) {
        this(TarotResultCard.class, forVariable(variable), INITS);
    }

    public QTarotResultCard(Path<? extends TarotResultCard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTarotResultCard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTarotResultCard(PathMetadata metadata, PathInits inits) {
        this(TarotResultCard.class, metadata, inits);
    }

    public QTarotResultCard(Class<? extends TarotResultCard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.card = inits.isInitialized("card") ? new QTarotCard(forProperty("card")) : null;
        this.result = inits.isInitialized("result") ? new QTarotResult(forProperty("result"), inits.get("result")) : null;
    }

}

