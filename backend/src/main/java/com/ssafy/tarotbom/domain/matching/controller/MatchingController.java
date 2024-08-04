package com.ssafy.tarotbom.domain.matching.controller;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseType;
import com.ssafy.tarotbom.domain.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

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
                    .data(null)
                    .build();
            sendingOperation.convertAndSend("/sub/matching/status/"+dto.getMemberId(), responseDto);
            return;
        }

        // [1] 초기 매칭 대상자 찾기
        // 매칭 요청을 한 객체에 대해 dto를 생성
        MatchingInfoDto myDto = MatchingInfoDto.builder()
                .keyword(dto.getKeyword())
                .roomStyle(dto.getRoomStyle())
                .matchedTime(LocalDateTime.now())
                .inConfirm(false)
                .memberId(dto.getMemberId())
                .memberType(dto.getMemberType())
                .build();
        MatchingInfoDto candidateDto = matchingService.searchToMatching(myDto);
        if(candidateDto != null){// 바로 찾을 수 있었다면 매칭 확인 매커니즘으로 넘어간다
            // 매칭 확인 요청을 보내는 메서드 호출
            sendConfirm(candidateDto, myDto);
        }
    }

    @MessageMapping("/confirm")

    private void sendConfirm(MatchingInfoDto dto1, MatchingInfoDto dto2){
        // dto1에 대한 작업
        dto1 = dto1.toBuilder().inConfirm(true).build();
        MatchingResponseDto responseDto = MatchingResponseDto.builder()
                .responseType(MatchingResponseType.MATCHING_MATCHED)
                .message("매칭되었습니다. 확인해주세요.")
                .data(dto2).build();
        sendingOperation.convertAndSend("/sub/matching/status/"+dto1.getMemberId(), responseDto);
        // dto2에 대한 작업
        dto2 = dto2.toBuilder().inConfirm(true).build();
        responseDto = MatchingResponseDto.builder()
                .responseType(MatchingResponseType.MATCHING_MATCHED)
                .message("매칭되었습니다. 확인해주세요.")
                .data(dto1).build();
        sendingOperation.convertAndSend("/sub/matching/status/"+dto2.getMemberId(), responseDto);
    }

}
