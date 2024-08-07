package com.ssafy.tarotbom.domain.board.controller;

import com.ssafy.tarotbom.domain.board.dto.request.BoardUpdateReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.CommentCreateReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.CommentUpdateReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.*;
import com.ssafy.tarotbom.domain.board.service.BoardService;
import com.ssafy.tarotbom.domain.board.service.CommentService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.util.List;


@RequestMapping("/boards")
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final CommentService commentService;

    // 게시글 작성
    @PostMapping("/write")
    public ResponseEntity<ResultResponse> writeBoard(@Valid @RequestBody BoardWriteReqDto boardWriteReqDto){
        BoardWriteResDto result = boardService.createBoard(boardWriteReqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_WRITE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 게시글 전체 조회
    @GetMapping("/list")
    public ResponseEntity<ResultResponse> getListBoard(){
        List<BoardListResDto> result = boardService.getListBoard();
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_GET_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 게시글 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<ResultResponse> getDetailBoard(@PathVariable long boardId){
        BoardDetailResDto result = boardService.getDetailBoard(boardId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_GET_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 게시글 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResultResponse> updateBoard(@PathVariable long boardId, @RequestBody BoardUpdateReqDto reqDto){
        BoardUpdateResDto result = boardService.updateBoard(boardId, reqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_UPDATE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 게시글 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResultResponse> deleteBoard(@PathVariable long boardId){
        BoardDeleteResDto result = boardService.deleteBoard(boardId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_DELETE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 댓글 생성하기
    @PostMapping("/{boardId}/comment")
    public ResponseEntity<ResultResponse> createComment(@PathVariable long boardId, @RequestBody CommentCreateReqDto reqDto){
        CommentCreateResDto result = commentService.createComment(boardId, reqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.COMMENT_CREATE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 댓글 수정하기
    @PutMapping("/{boardId}/comment")
    public ResponseEntity<ResultResponse> updateComment(@PathVariable long boardId, @RequestBody CommentUpdateReqDto reqDto){
        CommentUpdateResDto result = commentService.updateComment(boardId, reqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.COMMENT_UPDATE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 댓글 삭제하기
    @DeleteMapping("/{boardId}/comment/{commentId}")
    public ResponseEntity<ResultResponse> deleteComment(@PathVariable long boardId, @PathVariable long commentId){
        CommentDeleteResDto result = commentService.deleteComment(boardId, commentId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.COMMENT_DELETE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}