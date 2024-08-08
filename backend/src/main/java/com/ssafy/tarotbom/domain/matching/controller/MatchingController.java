package com.ssafy.tarotbom.domain.matching.controller;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingConfirmRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingConfirmResponseDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingRoomEnterResponseDto;
import com.ssafy.tarotbom.domain.matching.service.MatchingService;
import com.ssafy.tarotbom.domain.openvidu.service.OpenviduService;
import com.ssafy.tarotbom.global.socket.SocketCode;
import com.ssafy.tarotbom.global.socket.SocketResponse;
import com.ssafy.tarotbom.global.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private final OpenviduService openviduService;
    private final CookieUtil cookieUtil;

    @Value("${matching.status.path}")
    private String matchingStatusPath;

    @MessageMapping("/start")
    public synchronized void startMatching(MatchingStartRequestDto dto){

        // [0] 이미 매칭 중인 멤버인지 확인함과 동시에 매칭중임을 표기
        // 만일 이미 매칭 중인 멤버라면 돌려보낸다.
        if (!matchingService.setMatchingStatusStart(dto.getMemberId())){
            SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_ALREADY_PROCESSING);
            log.info("start 이미 매칭 중인 회원 : {}", dto.getMemberId());
            sendingOperation.convertAndSend(matchingStatusPath+dto.getMemberId(), socketResponse);
            return;
        }
        // [1] 초기 매칭 대상자 찾기
        // 매칭 요청을 한 객체에 대해 dto를 생성
        MatchingInfoDto myDto = MatchingInfoDto.builder()
                .keyword(dto.getKeyword())
                .roomStyle(dto.getRoomStyle())
                .matchedTime(LocalDateTime.now())
                .inConfirm(true) // 타 유저가 매칭하지 못하도록 우선은 true로 설정
                .memberId(dto.getMemberId())
                .memberType(dto.getMemberType())
                .worry(dto.getWorry())
                .build();
        // 이후 적절한 매칭 대기열에 현재 dto를 삽입
        matchingService.offerToMatchingQueue(myDto);
        MatchingInfoDto candidateDto = matchingService.searchToMatching(myDto);
        if(candidateDto != null){ // 바로 찾을 수 있었다면 매칭 확인 매커니즘으로 넘어간다
            // 매칭 확인 요청을 보내는 메서드 호출
            log.info("매칭 대상자 확인 : {}", candidateDto.getMemberId());
            sendConfirm(candidateDto, myDto);
            return;
        }
        // [2] 큐에 삽입
        // 초기에 매칭할 수 없었다면, 대기열에 현재 유저를 추가
        myDto.switchConfirm(); // 매칭 확인중 상태를 해제
        if (matchingService.offerToMatchingQueue(myDto)){
            SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_QUEUE_PUT, myDto);
            sendingOperation.convertAndSend(matchingStatusPath+dto.getMemberId(), socketResponse);
        } else {
            // 매칭 신청을 할 수 없었다면, 매칭 실패를 알리고 매칭 중 상태를 해제
            matchingService.setMatchingStatusEnd(dto.getMemberId());
            SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_QUEUE_PUT_FAILED, myDto);
            sendingOperation.convertAndSend(matchingStatusPath+dto.getMemberId(), socketResponse);
        }
    }

    @MessageMapping("/confirm")
    public void confirmMatching(MatchingConfirmRequestDto dto){
        MatchingInfoDto myDto = dto.getMemberDto();
        MatchingInfoDto candidateDto = dto.getCandidateDto();
        if(dto.getStatus().equals("accepted")){
            log.info("confirm 매칭 확인 : {} - 상대방 : {}", myDto.getMemberId(), candidateDto.getMemberId());
            if(matchingService.confirmMatching(myDto, candidateDto)){
                // 매칭이 성사되었다면, 매칭 큐에서 두 객체를 제거하고 방을 생성
                matchingService.removeFromMatchingQueue(myDto, candidateDto);
                matchingService.setMatchingStatusEnd(myDto.getMemberId());
                matchingService.setMatchingStatusEnd(candidateDto.getMemberId());
                log.info("방을 생성합니다...");
                long roomId = matchingService.openMatchingRoom(myDto, candidateDto);
                // my 쪽 메시지 전송
                String myToken = openviduService.getToken(myDto.getMemberId(), roomId);
                MatchingRoomEnterResponseDto myRoomEnterResponseDto = MatchingRoomEnterResponseDto.builder()
                        .token(myToken)
                        .build();
                SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_ENTER_ROOM, myRoomEnterResponseDto);
                sendingOperation.convertAndSend(matchingStatusPath+myDto.getMemberId(), socketResponse);
                // candidate 쪽 메시지 전송
                String candidateToken = openviduService.getToken(candidateDto.getMemberId(), roomId);
                MatchingRoomEnterResponseDto candidateRoomEnterResponseDto = MatchingRoomEnterResponseDto.builder()
                        .token(candidateToken)
                        .build();
                socketResponse = SocketResponse.of(SocketCode.MATCHING_ENTER_ROOM, candidateRoomEnterResponseDto);
                sendingOperation.convertAndSend(matchingStatusPath+candidateDto.getMemberId(), socketResponse);
            } else {
                // 아직 매칭확인을 수령하지 않은 상태여도 응답은 보내준다
                SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_CONFIRMED);
                sendingOperation.convertAndSend(matchingStatusPath+myDto.getMemberId(), socketResponse);
            }
        } else {
            log.info("매칭 취소됨 : {}", myDto.getMemberId());
            // 매칭이 취소된 경우, 매칭을 취소한 대상을 큐에서 제거한다.
            matchingService.removeFromMatchingQueue(myDto);
            matchingService.setMatchingStatusEnd(myDto.getMemberId());
            // 상대방의 매칭 중 상태도 해제해야함에 유의
            matchingService.setConfirmFalse(candidateDto);
            // 마지막으로 각각에게 응답을 보낸다
            SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_CANCELED, dto.getMemberDto());
            sendingOperation.convertAndSend(matchingStatusPath+myDto.getMemberId(), socketResponse);
            socketResponse = SocketResponse.of(SocketCode.MATCHING_CANDIDATE_CANCELED, dto.getCandidateDto());
            sendingOperation.convertAndSend(matchingStatusPath+candidateDto.getMemberId(), socketResponse);
        }
    }

    @MessageMapping("/cancel")
    public void cancelMatching(MatchingInfoDto dto) {
        log.info("매칭을 취소함 : {}", dto.getMemberId());
        matchingService.removeFromMatchingQueue(dto);
        matchingService.setMatchingStatusEnd(dto.getMemberId());
        SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_CANCELED, dto);
        sendingOperation.convertAndSend(matchingStatusPath+dto.getMemberId(), socketResponse);
    }

    private void sendConfirm(MatchingInfoDto dto1, MatchingInfoDto dto2){
        // dto1에 대한 작업
        dto1 = dto1.toBuilder().inConfirm(true).build();
        MatchingConfirmResponseDto responseDto1 = MatchingConfirmResponseDto.builder()
                .myDto(dto1)
                .candidateDto(dto2)
                .build();
        SocketResponse socketResponse = SocketResponse.of(SocketCode.MATCHING_MATCHED, responseDto1);
        sendingOperation.convertAndSend(matchingStatusPath+dto1.getMemberId(), socketResponse);
        // dto2에 대한 작업
        dto2 = dto2.toBuilder().inConfirm(true).build();
        MatchingConfirmResponseDto responseDto2 = MatchingConfirmResponseDto.builder()
                .myDto(dto2)
                .candidateDto(dto1)
                .build();
        socketResponse = SocketResponse.of(SocketCode.MATCHING_MATCHED, responseDto2);
        sendingOperation.convertAndSend(matchingStatusPath+dto2.getMemberId(), socketResponse);
        log.info("매칭 확인 요청 전송 완료 : {}, {}", dto1.getMemberId(), dto2.getMemberId());
    }

}
