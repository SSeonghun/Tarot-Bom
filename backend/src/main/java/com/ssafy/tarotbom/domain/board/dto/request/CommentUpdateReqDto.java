package com.ssafy.tarotbom.domain.board.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentUpdateReqDto {
    private long commentId;
    private long boardId;
    private long memberId;
    private String content;
}
