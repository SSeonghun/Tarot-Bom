package com.ssafy.tarotbom.domain.board.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class BoardCommentDto {
    private long commentId;
    private long boardId;
    private String content;
    private String writerName;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
