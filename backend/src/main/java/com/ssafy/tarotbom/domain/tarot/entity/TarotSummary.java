package com.ssafy.tarotbom.domain.tarot.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tarot_summary")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class TarotSummary {
    @Id
    @Column(name = "member_id", columnDefinition = "int unsigned")
    private long memberId;

    /* @ManyToOne으로 연결 : 타로카드 ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", insertable = false, updatable = false)
    private TarotCard card;

    @NotNull
    @Column(name = "content", length = 1000)
    private String content;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    /* @OneToOne과 각종 어노테이션을 통해 member_id를 Member의 pk와 연결  */
    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "member_id", columnDefinition = "int unsigned")
    private Member member;

    @NotNull
    @Column(name = "card_id")
    private int cardId;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.createTime = LocalDateTime.now();
    }

}
