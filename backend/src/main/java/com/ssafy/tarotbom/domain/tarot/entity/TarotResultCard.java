package com.ssafy.tarotbom.domain.tarot.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name="tarot_result_card")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class TarotResultCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_result_id", columnDefinition = "int unsigned")
    private long cardResultId;

    /* @ManyToOne으로 연결 : 카드ID, 결과ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", insertable = false, updatable = false, columnDefinition = "int(2)")
    private TarotCard card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id", insertable = false, updatable = false, columnDefinition = "int unsigned")
    private TarotResult result;

    @NotNull
    @Column(name = "sequence", columnDefinition = "int(2)")
    private int sequence;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(name = "direction", columnDefinition = "char(1)")
    private TarotDirection direction;

    @NotNull
    @Column(name = "card_id", columnDefinition = "int(2)")
    private int cardId;

    @NotNull
    @Column(name = "result_id", columnDefinition = "int unsigned")
    private long resultId;
}
