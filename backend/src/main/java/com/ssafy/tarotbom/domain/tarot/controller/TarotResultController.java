package com.ssafy.tarotbom.domain.tarot.controller;

import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.service.TarotResultService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/result")
@Slf4j
public class TarotResultController {

    private final TarotResultService tarotResultService;

    @PostMapping
    public ResponseEntity<ResultResponse> saveTarotResult(@RequestBody TarotResultSaveRequestDto dto) {
        tarotResultService.saveTarotResult(dto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.TAROT_CARD_RESULT_SAVED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
