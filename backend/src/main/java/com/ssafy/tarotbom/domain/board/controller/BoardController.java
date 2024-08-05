package com.ssafy.tarotbom.domain.board.controller;

import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardDetailResDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardListResDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardWriteResDto;
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
        ResultResponse resultResponse = ResultResponse.of(ResultCode.WRITE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<ResultResponse> getListBoard(){
        List<BoardListResDto> result = boardService.getListBoard();
        ResultResponse resultResponse = ResultResponse.of(ResultCode.GET_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ResultResponse> getDetailBoard(@PathVariable long boardId){
        BoardDetailResDto result = boardService.getDetailBoard(boardId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.GET_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
