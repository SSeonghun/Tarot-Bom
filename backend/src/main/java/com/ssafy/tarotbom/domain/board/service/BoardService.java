package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardDetailResDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardListResDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardWriteResDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface BoardService {
    BoardWriteResDto createBoard(BoardWriteReqDto boardWriteReqDto);
    List<BoardListResDto> getListBoard();
    BoardDetailResDto getDetailBoard(long boardId);
}
