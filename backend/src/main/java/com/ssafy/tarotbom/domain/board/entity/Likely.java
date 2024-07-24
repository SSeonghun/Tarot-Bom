package com.ssafy.tarotbom.domain.board.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="likely")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Likely {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likely_id", columnDefinition = "int unsigned")
    private long likelyId;

    /* @ManyToOne 연결 : 게시글 ID, 회원 ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", columnDefinition = "int unsigned")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", columnDefinition = "int unsigned")
    private Member member;
}
