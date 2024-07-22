package com.ssafy.tarotbom.domain.member.entity;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.global.code.entity.CodeType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false, columnDefinition = "int unsigned")
    private long memberId;

    @Column(name = "nickname", unique = true, length = 20)
    private String nickname;

    @Column(name = "email", unique = true, length=100)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "token", length = 500)
    private String token;

    @Column(name = "profile_url")
    private String profileUrl;

    // 추후 카카오 api 로그인 관련 필드 생성 예정
    // 여러모로 시커와 리더 구분이 필요한데, 여기서는 시커 기준으로 간다
    // 리더 쪽에서 자동으로 띄워줘야하는 리스트는 리더 기준으로 join

    /* @oneToOne 리스트
    * 1. 리더 프로필
    * 2. 개인 타로 요약
    * */
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "member")
    @PrimaryKeyJoinColumn
    private Reader reader;

    /* @oneToMany 로 연결되는 테이블이 엄청 많긴 한데, 전부 전체로딩하기엔 부담이 있는 데이터들
    * 따라서 일단 연결하지 않는다
    * */

    /* @ManyToOne 리스트
    * 1. 회원유형 (시커, 리더, 매니저)
    * */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="member_type", columnDefinition = "char(3)")
    private CodeDetail memberType;

}
