package com.ssafy.tarotbom.domain.board.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentCreateReqDto {
    private long boardId;
    private long memberId;
    private String content;
}
