package com.ssafy.tarotbom.domain.board.dto.response;

import com.ssafy.tarotbom.domain.board.dto.BoardCommentDto;
import com.ssafy.tarotbom.domain.board.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class BoardDetailResDto {
    private long boardId;
    private String title;
    private String content;
    private long likelyCnt;
    private String writer;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private List<BoardCommentDto> commentList;

}
