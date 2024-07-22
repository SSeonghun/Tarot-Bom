package com.ssafy.tarotbom.domain.room.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/* 240722 제안 : 이거 tarot log보다는 room log가 좀 더 맞는 표현같기도?? */

@Entity
@Table(name="tarot_log")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class TarotLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", columnDefinition = "int unsigned")
    private long logId;

    /* 유저ID, 방Id : @ManyToOne */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;
    
    @Column(name = "type", columnDefinition = "int(1)")
    private int type;
    
    @Column(name = "time", columnDefinition = "timestamp")
    private LocalDateTime time;
    
    // 튜플 삽입시 출입시간 자동으로 기록되도록
    @PrePersist
    public void prePersist() {
        this.time = LocalDateTime.now();
    }
}
