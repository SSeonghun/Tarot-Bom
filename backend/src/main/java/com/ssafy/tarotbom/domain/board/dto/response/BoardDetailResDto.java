package com.ssafy.tarotbom.domain.board.dto.response;

import com.ssafy.tarotbom.domain.board.entity.Comment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class BoardDetailResDto {
    private long boardId;
    private String title;
    private String content;
    private long likelyCnt;
    private String writer;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private List<Comment> commentList;

}
