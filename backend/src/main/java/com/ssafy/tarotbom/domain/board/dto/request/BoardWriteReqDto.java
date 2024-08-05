package com.ssafy.tarotbom.domain.board.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardWriteReqDto {
    private long memberId;
    private String title;
    private String content;
    private String category;

}
