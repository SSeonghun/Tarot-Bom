package com.ssafy.tarotbom.domain.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Builder
public class CommentCreateResDto {
    private long commentId;
    private long boardId;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
