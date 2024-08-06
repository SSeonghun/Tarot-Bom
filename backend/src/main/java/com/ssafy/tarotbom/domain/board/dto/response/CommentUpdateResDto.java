package com.ssafy.tarotbom.domain.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class CommentUpdateResDto {
    private long commentId;
    private long boardId;
    private long memberId;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
