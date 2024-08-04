package com.ssafy.tarotbom.domain.board.dto.request;

import lombok.Getter;

@Getter
public class BoardWriteReqDto {
    private long memberId;
    private String title;
    private String content;
    private String category;

}
