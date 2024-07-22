package com.ssafy.tarotbom.domain.tarot.entity;

import jakarta.persistence.*;
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
    @JoinColumn(name = "card_id", referencedColumnName = "", columnDefinition = "int(2)")
    private TarotCard card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id", columnDefinition = "int unsigned")
    private TarotResult result;

    /* 240722 : 생각해보니 타로 카드는 뽑는 순서도 중요해서 몇번째로 뽑은 카드인지도 기록해야할거같음!!! */
    @Column(name = "sequence", columnDefinition = "int(2)")
    private int sequence;
}
