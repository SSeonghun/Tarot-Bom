package com.ssafy.tarotbom.domain.room.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="room")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", columnDefinition = "int unsigned")
    private long roomId;

    /* 리더ID, 시커ID, 상담분야는 각각 @ManyToOne으로 연결한다 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id")
    private Member reader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id")
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword", columnDefinition = "char(3)")
    private CodeDetail keyword;

    @Column(name = "create_date", columnDefinition = "timestamp")
    private LocalDateTime createDate;

    @Column(name = "close_date", columnDefinition = "timestamp")
    private LocalDateTime closeDate;

    @Column(name = "is_normal_close")
    private boolean isNormalClose;

    @Column(name = "room_url")
    private String roomUrl;

    @Column(name = "worry", length = 150)
    private String worry;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

}
