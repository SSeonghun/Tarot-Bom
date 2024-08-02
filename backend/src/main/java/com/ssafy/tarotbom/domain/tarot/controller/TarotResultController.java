package com.ssafy.tarotbom.domain.tarot.controller;

import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.service.TarotResultService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/result")
@Slf4j
public class TarotResultController {

    private final TarotResultService tarotResultService;

    @GetMapping("/search/{resultId}")
    public ResponseEntity<ResultResponse> getTarotResult(@PathVariable("resultId") long resultId) {
        TarotResultGetResponseDto result = tarotResultService.getTarotResult(resultId, 1);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.TAROT_CARD_RESULT_FOUND, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping
    public ResponseEntity<ResultResponse> saveTarotResult(@RequestBody TarotResultSaveRequestDto dto) {
        tarotResultService.saveTarotResult(dto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.TAROT_CARD_RESULT_SAVED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


}
