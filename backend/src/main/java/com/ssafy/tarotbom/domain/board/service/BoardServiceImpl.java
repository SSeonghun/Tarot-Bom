package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.BoardCommentDto;
import com.ssafy.tarotbom.domain.board.dto.request.BoardUpdateReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.*;
import com.ssafy.tarotbom.domain.board.entity.Board;
import com.ssafy.tarotbom.domain.board.entity.Comment;
import com.ssafy.tarotbom.domain.board.repository.BoardRepository;
import com.ssafy.tarotbom.domain.board.repository.CommentRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    // 게시판 생성 시 : memberId, 카테고리(공지, 카드정보 등), 제목, 내용
    // 게시판 생성 성공하면 결과로 해당 정보(멤버Id, 게시판Id, 제목, 내용, 생성시간, 카테고리, 댓글 수, 좋아요 수 알려줌.
    @Transactional
    @Override
    public BoardWriteResDto createBoard(@Valid BoardWriteReqDto boardWriteReqDto) {

        Board board = Board.builder()
                .memberId(boardWriteReqDto.getMemberId())
                .category(boardWriteReqDto.getCategory())
                .title(boardWriteReqDto.getTitle())
                .content(boardWriteReqDto.getContent())
                .build();

        Board saveBoard = boardRepository.save(board);

        return BoardWriteResDto.builder()
                .memberId(saveBoard.getMemberId())
                .boardId(saveBoard.getBoardId())
                .title(saveBoard.getTitle())
                .content(saveBoard.getContent())
                .createTime(saveBoard.getCreateTime())
                .category(saveBoard.getCategory())
                .commentCnt(saveBoard.getCommentCnt())
                .likelyCnt(saveBoard.getLikelyCnt())
                .build();
    }

    // 전체 게시글 리스트 보내기(게시판아이디, 멤버id, 작성자, 카테고리, 제목, 내용)
    @Transactional(readOnly = true)
    @Override
    public List<BoardListResDto> getListBoard() {
        List<Board> boards = boardRepository.findAll();

        if(boards.isEmpty()){
            throw new BusinessException(ErrorCode.BOARD_EMPTY);
        }


        return boards.stream().map(board -> BoardListResDto.builder()
                        .boardId(board.getBoardId())
                        .memberId(board.getMemberId())
                        .nickname(board.getMember().getNickname())
                        .category(board.getCategory())
                        .title(board.getTitle())
                        .createdTime(board.getCreateTime())
                        .updateTime(board.getUpdateTime())
                        .commentCnt(board.getCommentCnt())
                        .likelyCnt(board.getLikelyCnt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public BoardDetailResDto getDetailBoard(long boardId){
        Board board = boardRepository.findBoardByBoardId(boardId).orElseThrow(
                () ->new BusinessException(ErrorCode.BOARD_NOT_FOUND)
        );

        List<Comment> comments = commentRepository.findByBoardId(boardId);
        List<BoardCommentDto> commentList = comments.stream().map(comment -> BoardCommentDto.builder()
                        .commentId(comment.getCommentId())
                        .boardId(comment.getBoardId())
                        .content(comment.getContent())
                        .writerName(comment.getWriter().getNickname())
                        .createTime(comment.getCreateTime())
                        .updateTime(comment.getUpdateTime())
                        .build())
                .collect(Collectors.toList());

        return BoardDetailResDto.builder()
                .boardId(board.getBoardId())
                .title(board.getTitle())
                .content(board.getContent())
                .likelyCnt(board.getLikelyCnt())
                .writer(board.getMember().getNickname())
                .createTime(board.getCreateTime())
                .updateTime(board.getUpdateTime())
                .commentList(commentList)
                .build();
    }

    @Transactional
    @Override
    public BoardUpdateResDto updateBoard(long boardId, BoardUpdateReqDto reqDto){
        Board board = boardRepository.findBoardByBoardId(boardId).orElseThrow(
                () -> new BusinessException(ErrorCode.BOARD_NOT_FOUND)
        );

        if(board.getMemberId() != reqDto.getMemberId() ) {
            throw new BusinessException(ErrorCode.BOARD_NOT_YOUR_BOARD);
        }

        Board updateBoard = Board.builder()
                .boardId(board.getBoardId())
                .memberId(reqDto.getMemberId())
                .category(reqDto.getCategory())
                .title(reqDto.getTitle())
                .content(reqDto.getContent())
                .createTime(board.getCreateTime())
                .build();

        boardRepository.save(updateBoard);

        return BoardUpdateResDto.builder()
                .boardId(updateBoard.getBoardId())
                .title(updateBoard.getTitle())
                .content(updateBoard.getContent())
                .updateTime(board.getUpdateTime())
                .build();
    }

    @Transactional
    @Override
    public BoardDeleteResDto deleteBoard(long boardId) {
        if (!boardRepository.existsById(boardId)) {
            throw new BusinessException(ErrorCode.BOARD_NOT_FOUND);
        }
        try {
            boardRepository.deleteById(boardId);
            return BoardDeleteResDto.builder()
                    .BoardId(boardId)
                    .build();
        } catch (DataIntegrityViolationException e){
            throw new BusinessException(ErrorCode.BOARD_DATA_INTEGRITY_VIOLATION);
        }
    }



}
