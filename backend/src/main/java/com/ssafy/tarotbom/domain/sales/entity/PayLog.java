package com.ssafy.tarotbom.domain.sales.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="pay_log")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class PayLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_log_id", columnDefinition = "int unsigned")
    private long payLogId;

    /* @ManyToOne으로 연결 : 결제인(시커) ID, 수령인(리더) ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", columnDefinition = "int unsigned")
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id", columnDefinition = "int unsigned")
    private Member reader;

    @Column(name = "price")
    private int price;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

}
