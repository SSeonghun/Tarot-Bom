package com.ssafy.tarotbom.domain.board.controller;

import com.ssafy.tarotbom.domain.board.dto.request.BoardUpdateReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.*;
import com.ssafy.tarotbom.domain.board.service.BoardService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/boards")
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/write")
    public ResponseEntity<ResultResponse> writeBoard(@Valid @RequestBody BoardWriteReqDto boardWriteReqDto){
        BoardWriteResDto result = boardService.createBoard(boardWriteReqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_WRITE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<ResultResponse> getListBoard(){
        List<BoardListResDto> result = boardService.getListBoard();
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_GET_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ResultResponse> getDetailBoard(@PathVariable long boardId){
        BoardDetailResDto result = boardService.getDetailBoard(boardId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_GET_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<ResultResponse> updateBoard(@PathVariable long boardId, @RequestBody BoardUpdateReqDto reqDto){
        BoardUpdateResDto result = boardService.updateBoard(boardId, reqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_UPDATE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResultResponse> deleteBoard(@PathVariable long boardId){
        BoardDeleteResDto result = boardService.deleteBoard(boardId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.BOARD_DELETE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
