package com.ssafy.tarotbom.domain.board.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="board")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id", columnDefinition = "int unsigned")
    private long boardId;

    /* @ManyToOne으로 연결 : 작성자ID, 게시글유형 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_type")
    private CodeDetail boardType;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", length=1000)
    private String content;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    @Column(name = "update_time", columnDefinition = "timestamp")
    private LocalDateTime updateTime;

    @Column(name = "comment_cnt")
    private int commentCnt;

    @Column(name = "likely_cnt", columnDefinition = "int unsigned")
    private long likelyCnt;

    /* @OneToMany로 연결 : 댓글 리스트(Comment), 좋아요 리스트 */
    // 부모-자식 관계가 확실하기 때문에, 게시글 삭제시 댓글도 삭제되게 설정
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "board", cascade = CascadeType.ALL)
    List<Comment> commentList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "board", cascade = CascadeType.ALL)
    List<Likely> likelyList;

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
