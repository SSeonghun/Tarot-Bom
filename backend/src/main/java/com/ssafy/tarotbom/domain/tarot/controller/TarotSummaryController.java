package com.ssafy.tarotbom.domain.tarot.controller;

import com.ssafy.tarotbom.domain.tarot.dto.request.TarotSummaryRenewRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotSummaryGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.service.TarotSummaryService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/summary")
@Slf4j
public class TarotSummaryController {
    private final TarotSummaryService tarotSummaryService;

    @PostMapping("/renew")
    public ResponseEntity<ResultResponse> renewSummary(@RequestBody TarotSummaryRenewRequestDto dto, HttpServletRequest request) {
        tarotSummaryService.renewTarotSummary(dto, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.TAROT_SUMMARY_RENEWED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping
    public ResponseEntity<ResultResponse> getSummary(HttpServletRequest request) {
        TarotSummaryGetResponseDto tarotSummaryGetResponseDto = tarotSummaryService.getTarotSummary(request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.TAROT_SUMMARY_GET_OK, tarotSummaryGetResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
