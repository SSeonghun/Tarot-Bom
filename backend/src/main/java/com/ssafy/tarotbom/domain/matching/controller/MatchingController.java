package com.ssafy.tarotbom.domain.matching.controller;

import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseType;
import com.ssafy.tarotbom.domain.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@MessageMapping("/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;
    private final SimpMessageSendingOperations sendingOperation;

    @MessageMapping("/start")
    public void startMatching(MatchingStartRequestDto dto){
        // 매칭 요청이 들어오면 매칭을 시도한다

        // [0] 이미 매칭 중인 멤버인지 확인함과 동시에 매칭중임을 표기
        // 만일 이미 매칭 중인 멤버라면 돌려보낸다.
        if (!matchingService.setMatchingStatusStart(dto.getMemberId())){
            MatchingResponseDto responseDto = MatchingResponseDto.builder()
                    .responseType(MatchingResponseType.MATCHING_ALREADY_PROCESSING)
                    .message("이미 매칭 중입니다.")
                    .build();
            sendingOperation.convertAndSend("/sub/matching/status/"+dto.getMemberId(), responseDto);
        }

        // [0] 매칭 대상을 찾은 경우
        // 현재 대상과 매칭 대상에게 매칭 확인 메시지를 보냄
//        MatchingResponse(1);
//        MatchingResponse(2);

    }


}
