package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardWriteResDto;
import org.springframework.stereotype.Service;


public interface BoardService {
    BoardWriteResDto createBoard(BoardWriteReqDto boardWriteReqDto);
}
