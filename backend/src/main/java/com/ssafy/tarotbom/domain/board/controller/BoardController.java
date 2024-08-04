package com.ssafy.tarotbom.domain.board.controller;

import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardWriteResDto;
import com.ssafy.tarotbom.domain.board.service.BoardService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/boards")
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/write")
    public ResponseEntity<ResultResponse> writeBoard(@RequestBody BoardWriteReqDto boardWriteReqDto){
        BoardWriteResDto result = boardService.createBoard(boardWriteReqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.WRITE_OK, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
