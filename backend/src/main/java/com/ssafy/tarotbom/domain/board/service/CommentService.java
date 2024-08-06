package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.CommentCreateReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.CommentUpdateReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentCreateResDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentUpdateResDto;

public interface CommentService {
    CommentCreateResDto createComment(long boardId, CommentCreateReqDto reqDto);
    CommentUpdateResDto updateComment(long boardId, CommentUpdateReqDto reqDto);
}
