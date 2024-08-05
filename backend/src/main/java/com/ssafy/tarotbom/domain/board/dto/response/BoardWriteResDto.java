package com.ssafy.tarotbom.domain.board.dto.response;

import com.ssafy.tarotbom.domain.board.entity.Comment;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class BoardWriteResDto {

    private long memberId;
    private String title;
    private String content;
    private LocalDateTime createTime;
    private String category;
    private int commentCnt;
    private long likelyCnt;

/*  게시글을 작성하면 해당 상세페이지로 들어간다.
    private long boardId;
    private String title;
    private String content;
    private long likelyCnt;
    private String writer;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private List<Comment> commentList;
*/

}
