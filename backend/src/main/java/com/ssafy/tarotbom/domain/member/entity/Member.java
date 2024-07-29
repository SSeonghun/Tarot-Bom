package com.ssafy.tarotbom.domain.member.entity;

import com.ssafy.tarotbom.domain.tarot.entity.TarotSummary;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.global.code.entity.CodeType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", columnDefinition = "int unsigned")
    private long memberId;

    @NotNull
    @Column(name = "nickname", unique = true, length = 20)
    private String nickname;

    @NotNull
    @Column(name = "email", unique = true, length=100)
    private String email;

    @NotNull
    @Column(name = "password")
    private String password;

    @Column(name = "token", length = 500)
    private String token;

    @Column(name = "profile_url")
    private String profileUrl;

    // 추후 카카오 api 로그인 관련 필드 생성 예정

    /* @oneToOne 리스트
    * 1. 리더 프로필
    * 2. 개인 타로 요약
    * */
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "member")
    @PrimaryKeyJoinColumn
    private Reader reader;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "member")
    @PrimaryKeyJoinColumn
    private TarotSummary tarotSummary;

    /* @oneToMany 로 연결되는 테이블이 엄청 많긴 한데, 전부 전체로딩하기엔 부담이 있는 데이터들
    * 따라서 일단 연결하지 않는다
    * */

    /* @ManyToOne 리스트
    * 1. 회원유형 (시커, 리더, 매니저)
    * */

    @NotNull
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="member_type", columnDefinition = "char(3)")
    private CodeDetail memberType;

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

    public Member(String nickname, String email, String password, CodeDetail memberType) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.memberType = memberType;
    }

    public void setMemberType(@NotNull CodeDetail memberType) {
        this.memberType = memberType;
    }
}
