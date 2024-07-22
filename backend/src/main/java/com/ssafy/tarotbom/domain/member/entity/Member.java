package com.ssafy.tarotbom.domain.member.entity;

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

    @Column(name = "is_reader")
    private boolean isReader;

    @Column(name = "is_manager")
    private boolean isManager;

    @Column(name = "profile_url")
    private String profileUrl;

    // 추후 카카오 api 로그인 관련 필드 생성 예정
    // 여러모로 시커와 리더 구분이 필요한데, 여기서는 시커 기준으로 간다
    // 리더 쪽에서 자동으로 띄워줘야하는 리스트는 리더 기준으로 join

    /* @oneToOne 리스트
    * 1. 리더 프로필
    * */
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "member")
    @PrimaryKeyJoinColumn
    private Reader reader;

    /* @oneToMany 리스트
    * 2. 개인 타로 요약
    * 3. 알람?
    * 4. 예약 (여기서는 시커 기준 조회)
    * */

}
