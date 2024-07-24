package com.ssafy.tarotbom.domain.report.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.room.entity.Room;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="report")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id", columnDefinition = "int unsigned")
    private long reportId;

    /* 대부분이 @ManyToOne으로 연결됨! 
    * 리스트 : 신고자/신고대상 ID, 방 ID, 신고유형, 처리현황 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", columnDefinition = "int unsigned")
    private Member reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_id", columnDefinition = "int unsigned")
    private Member reported;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", columnDefinition = "int unsigned")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_type", columnDefinition = "char(3)")
    private CodeDetail reportType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status", columnDefinition = "char(3)")
    private CodeDetail status;

    @Column(name = "content", length = 500)
    private String content;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

}
