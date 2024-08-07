package com.ssafy.tarotbom.domain.board.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardUpdateReqDto {
    private long memberId;
    private String title;
    private String content;
    private String category;
}
