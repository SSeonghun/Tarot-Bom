package com.ssafy.tarotbom.domain.member.entity;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="reader")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
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

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="grade") // 공통코드
    private CodeDetail grade;

}
