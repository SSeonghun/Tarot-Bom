package com.ssafy.tarotbom.domain.tarot.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTarotCard is a Querydsl query type for TarotCard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTarotCard extends EntityPathBase<TarotCard> {

    private static final long serialVersionUID = -1951221556L;

    public static final QTarotCard tarotCard = new QTarotCard("tarotCard");

    public final NumberPath<Integer> cardId = createNumber("cardId", Integer.class);

    public final StringPath cardName = createString("cardName");

    public final StringPath cardType = createString("cardType");

    public final StringPath description = createString("description");

    public final StringPath imageUrl = createString("imageUrl");

    public final NumberPath<Integer> number = createNumber("number", Integer.class);

    public QTarotCard(String variable) {
        super(TarotCard.class, forVariable(variable));
    }

    public QTarotCard(Path<? extends TarotCard> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTarotCard(PathMetadata metadata) {
        super(TarotCard.class, metadata);
    }

}

