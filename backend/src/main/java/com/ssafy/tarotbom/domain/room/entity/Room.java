package com.ssafy.tarotbom.domain.room.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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

    /* @ManyToOne으로 연결 : 리더ID, 시커ID, 상담분야 */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id")
    private Member reader;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id")
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword", columnDefinition = "char(3)")
    private CodeDetail keyword;

    @Column(name = "create_date", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    @Column(name = "close_date", columnDefinition = "timestamp")
    private LocalDateTime closeTime;

    @Column(name = "is_normal_close", columnDefinition = "tinyint(1)")
    private boolean isNormalClose;

    @Column(name = "room_url")
    private String roomUrl;

    @Column(name = "worry", length = 150)
    private String worry;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

}
