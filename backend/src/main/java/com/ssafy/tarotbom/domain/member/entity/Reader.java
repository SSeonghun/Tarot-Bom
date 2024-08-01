package com.ssafy.tarotbom.domain.member.entity;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Table(name="reader")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@DynamicInsert
public class Reader {

    @Id
    @Column(name = "member_id", nullable = false, columnDefinition = "int unsigned")
    private long memberId;

    @Column(name = "intro")
    private String intro;

    @Column(name = "rating", columnDefinition = "DECIMAL(6, 5)")
    private double rating; // 소숫점 5자리까지 저장

    @Column(name = "price")
    private int price;

    /* @OneToOne과 각종 어노테이션을 통해 member_id를 Member의 pk와 연결  */
    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "member_id", columnDefinition = "int unsigned")
    private Member member;

    /* @ManyToOne 으로 받아올 것
    * 1.자신분야 (공통코드 쪽)
    * 2.등급 (공통코드 쪽)
    * */

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="keyword") // 자신분야
    private CodeDetail keyword;

    @NotNull
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="grade") // 공통코드
    private CodeDetail grade;

    @ColumnDefault("0")
    @Column(name = "score")
    private int score;

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
