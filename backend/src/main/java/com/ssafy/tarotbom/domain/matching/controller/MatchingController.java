package com.ssafy.tarotbom.domain.matching.controller;

import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseDto;
import com.ssafy.tarotbom.domain.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@MessageMapping("/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;

    @MessageMapping("/start")
    @SendTo("/matching/status/{memberId}")
    public MatchingResponseDto startMatching(@DestinationVariable("memberId") long memberId, MatchingStartRequestDto dto){
        // 매칭 요청이 들어오면 매칭을 시도한다

    }


}
