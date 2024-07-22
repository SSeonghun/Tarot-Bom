package com.ssafy.tarotbom.domain.tarot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tarot_card")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class TarotCard {

    @Id
    @Column(name = "card_id", columnDefinition = "int(2)")
    private int cardId;

    @Column(name = "card_type", length=10)
    private String cardType;

    @Column(name = "card_name", length=50)
    private String cardName;

    @Column(name = "number", columnDefinition = "int(2)")
    private int number;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

}
