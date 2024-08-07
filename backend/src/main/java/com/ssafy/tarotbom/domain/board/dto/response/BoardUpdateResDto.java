package com.ssafy.tarotbom.domain.board.dto.response;

import com.ssafy.tarotbom.domain.board.dto.BoardCommentDto;
import com.ssafy.tarotbom.domain.board.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class BoardUpdateResDto {

    private long boardId;
    private String title;
    private String content;
    private LocalDateTime updateTime;

}
