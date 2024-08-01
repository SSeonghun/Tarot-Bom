package com.ssafy.tarotbom.domain.room.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="room_log")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class RoomLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", columnDefinition = "int unsigned")
    private long logId;

    /* @ManyToOne으로 연결 : 유저ID, 방ID */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @NotNull
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
