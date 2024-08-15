package com.ssafy.tarotbom.domain.tarot.controller;

import com.ssafy.tarotbom.domain.tarot.dto.response.TarotCardInfoResponseDto;
import com.ssafy.tarotbom.domain.tarot.service.TarotCardService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
@Slf4j
public class //TarotCardController {
    private final TarotCardService tarotCardService;

    @GetMapping("/info/{cardId}")
    public ResponseEntity<ResultResponse> info(@PathVariable("cardId") int cardId) {
        TarotCardInfoResponseDto dto = tarotCardService.getTarotCardInfo(cardId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.TAROT_CARD_INFO_FOUND, dto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
