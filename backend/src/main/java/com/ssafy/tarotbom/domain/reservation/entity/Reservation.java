package com.ssafy.tarotbom.domain.reservation.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.room.entity.Room;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="reservation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id", columnDefinition = "int unsigned")
    private long reservationId;

    /* @ManyToOne으로 연결 : 방ID, 리더/시커ID, 상태, 상담분야 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", insertable = false, updatable = false, columnDefinition = "int unsigned")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", insertable = false, updatable = false, columnDefinition = "int unsigned")
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id", insertable = false, updatable = false, columnDefinition = "int unsigned")
    private Member reader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status", columnDefinition = "char(3)", insertable = false, updatable = false)
    private CodeDetail status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword", columnDefinition = "char(3)", insertable = false, updatable = false)
    private CodeDetail keyword;

    @NotNull
    @Column(name = "price")
    private int price;

    @Column(name = "start_time", columnDefinition = "timestamp")
    private LocalDateTime startTime;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    @Column(name = "update_time", columnDefinition = "timestamp")
    private LocalDateTime updateTime;

    // 단순 쿼리를 위한 string column 생성
    
    @Column(name = "room_id", columnDefinition = "int unsigned")
    private long roomId;

    @Column(name = "seeker_id", columnDefinition = "int unsigned")
    private long seekerId;

    @NotNull
    @Column(name = "status", columnDefinition = "char(3)")
    private String statusCode;

    @NotNull
    @Column(name = "reader_id", columnDefinition = "int unsigned")
    private long readerId;

    @NotNull
    @Column(name = "keyword", columnDefinition = "char(3)")
    private String keywordCode;

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
