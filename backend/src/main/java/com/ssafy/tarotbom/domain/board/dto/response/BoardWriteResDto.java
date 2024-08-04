package com.ssafy.tarotbom.domain.board.dto.response;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class BoardWriteResDto {
    private long memberId;
    private String title;
    private String content;
    private LocalDateTime createTime;
    private String category;
    private int commentCnt;
    private long likelyCnt;
}
