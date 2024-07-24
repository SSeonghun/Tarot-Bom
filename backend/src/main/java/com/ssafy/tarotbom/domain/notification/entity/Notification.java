package com.ssafy.tarotbom.domain.notification.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="notification")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no_id", columnDefinition = "int unsigned")
    private long noId;

    /* @ManyToOne으로 연결 : 알람받을 사용자 ID, 알람 유형 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", columnDefinition = "int unsigned")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "no_type", columnDefinition = "char(3)")
    private CodeDetail noType;

    @Column(name = "content", length=100)
    private String content;

    @Column(name = "is_read", columnDefinition = "tinyint(1)")
    private boolean isRead;

    @Column(name = "is_valid", columnDefinition = "tinyint(1)")
    private boolean isValid;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

}
