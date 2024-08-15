package com.ssafy.tarotbom.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="favorite_reader")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class FavoriteReader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id", columnDefinition = "int unsigned")
    private long favoriteId;

    /* @ManyToOne으로 연결 : 찜한사람 ID, 리더 ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", columnDefinition = "int unsigned", insertable = false, updatable = false)
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id", columnDefinition = "int unsigned", insertable = false, updatable = false)
    private Reader reader;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    @NotNull
    @Column(name = "seeker_id", columnDefinition = "int unsigned")
    private long seekerId;

    @NotNull
    @Column(name = "reader_id", columnDefinition = "int unsigned")
    private long readerId;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }
}
