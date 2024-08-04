package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardWriteResDto;
import com.ssafy.tarotbom.domain.board.entity.Board;
import com.ssafy.tarotbom.domain.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;

    @Override
    public BoardWriteResDto createBoard(BoardWriteReqDto boardWriteReqDto) {
        // 게시판 생성할 때 넣어야 할 자료들 보고 적기(resDto도 고쳐야함)
        Board board =  Board.builder()
                .memberId(boardWriteReqDto.getMemberId())
                .category(boardWriteReqDto.getCategory())
                .title(boardWriteReqDto.getTitle())
                .content(boardWriteReqDto.getContent())
                .build();

        Board saveBoard = boardRepository.save(board);

        BoardWriteResDto result = BoardWriteResDto.builder()
                .memberId(saveBoard.getMemberId())
                .title(saveBoard.getTitle())
                .content(saveBoard.getContent())
                .createTime(saveBoard.getCreateTime())
                .category(saveBoard.getCategory())
                .commentCnt(saveBoard.getCommentCnt())
                .likelyCnt(saveBoard.getLikelyCnt())
                .build();

        return result;
    }
}
