package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.CommentCreateReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentCreateResDto;

public interface CommentService {
    CommentCreateResDto commentCreate(long boardId, CommentCreateReqDto reqDto);
}
