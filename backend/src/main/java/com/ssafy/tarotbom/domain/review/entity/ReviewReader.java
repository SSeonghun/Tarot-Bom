package com.ssafy.tarotbom.domain.review.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="review_reader")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class ReviewReader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_reader_id", columnDefinition = "int unsigned")
    private long reviewReaderId;

    /* @ManyToOne으로 연결 : 시커/리더ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", columnDefinition = "int unsigned")
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id", columnDefinition = "int unsigned")
    private Member reader;

    /* @OneToOne으로 연결 : 타로결과ID */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id", columnDefinition = "int unsigned")
    private TarotResult result;

    @Column(name = "rating")
    private int rating;

    @Column(name = "content", length = 500)
    private String content;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    @Column(name = "update_time", columnDefinition = "timestamp")
    private LocalDateTime updateTime;

    // create time, update time 자동갱신
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createTime = now;
        this.updateTime = now;
    }

    // update time 자동갱신
    @PreUpdate
    public void preUpdate() {
        this.updateTime = LocalDateTime.now();
    }

}
