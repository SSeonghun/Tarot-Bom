package com.ssafy.tarotbom.domain.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class BoardListResDto {

    private long boardId;
    private long memberId;
    private String nickname;
    private String category;
    private String title;
    private LocalDateTime createdTime;
    private LocalDateTime updateTime;
    private int commentCnt;
    private long likelyCnt;


}
