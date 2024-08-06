package com.ssafy.tarotbom.domain.matching.controller;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingCancelRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingConfirmRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingConfirmResponseDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseDto;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingResponseType;
import com.ssafy.tarotbom.domain.matching.dto.response.MatchingRoomEnterResponseDto;
import com.ssafy.tarotbom.domain.matching.service.MatchingService;
import com.ssafy.tarotbom.domain.openvidu.service.OpenviduService;
import com.ssafy.tarotbom.domain.room.dto.request.RoomEnterRequestDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomOpenResponseDto;
import com.ssafy.tarotbom.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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

    @MessageMapping("/start")
    public synchronized void startMatching(MatchingStartRequestDto dto){
        // [0] 이미 매칭 중인 멤버인지 확인함과 동시에 매칭중임을 표기
        // 만일 이미 매칭 중인 멤버라면 돌려보낸다.
        if (!matchingService.setMatchingStatusStart(dto.getMemberId())){
            MatchingResponseDto responseDto = MatchingResponseDto.builder()
                    .responseType(MatchingResponseType.MATCHING_ALREADY_PROCESSING)
                    .message("이미 매칭 중입니다.")
                    .data(null)
                    .build();
            log.info("이미 매칭 중인 회원 : {}", dto.getMemberId());
            sendingOperation.convertAndSend("/sub/matching/status/"+dto.getMemberId(), responseDto);
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
            MatchingResponseDto responseDto = MatchingResponseDto.builder()
                    .responseType(MatchingResponseType.MATCHING_QUEUE_PUT)
                    .message("매칭 신청을 완료했습니다.")
                    .data(myDto)
                    .build();
            sendingOperation.convertAndSend("/sub/matching/status/"+dto.getMemberId(), responseDto);
        } else {
            // 매칭 신청을 할 수 없었다면, 매칭 실패를 알리고 매칭 중 상태를 해제
            matchingService.setMatchingStatusEnd(dto.getMemberId());
            MatchingResponseDto responseDto = MatchingResponseDto.builder()
                    .responseType(MatchingResponseType.MATCHING_QUEUE_PUT)
                    .message("매칭 신청에 실패했습니다. 다시 시도해주세요.")
                    .data(myDto)
                    .build();
            sendingOperation.convertAndSend("/sub/matching/status/"+dto.getMemberId(), responseDto);
        }
    }

    @MessageMapping("/confirm")
    public void confirmMatching(MatchingConfirmRequestDto dto){
        MatchingInfoDto myDto = dto.getMemberDto();
        MatchingInfoDto candidateDto = dto.getCandidateDto();
        if(dto.getStatus().equals("accepted")){
            log.info("매칭 확인 : {} - 상대방 : {}", myDto.getMemberId(), candidateDto.getMemberId());
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
                MatchingResponseDto myResponseDto = MatchingResponseDto
                        .builder()
                        .responseType(MatchingResponseType.MATCHING_ENTER_ROOM)
                        .message("매칭 확인이 완료되었습니다. 방에 입장합니다...")
                        .data(myRoomEnterResponseDto)
                        .build();
                sendingOperation.convertAndSend("/sub/matching/status/"+myDto.getMemberId(), myResponseDto);
                // candidate 쪽 메시지 전송
                String candidateToken = openviduService.getToken(candidateDto.getMemberId(), roomId);
                MatchingRoomEnterResponseDto candidateRoomEnterResponseDto = MatchingRoomEnterResponseDto.builder()
                        .token(candidateToken)
                        .build();
                MatchingResponseDto candidateResponseDto = MatchingResponseDto
                        .builder()
                        .responseType(MatchingResponseType.MATCHING_ENTER_ROOM)
                        .message("매칭 확인이 완료되었습니다. 방에 입장합니다...")
                        .data(candidateRoomEnterResponseDto)
                        .build();
                sendingOperation.convertAndSend("/sub/matching/status/"+candidateDto.getMemberId(), candidateResponseDto);
            } else {
                // 아직 매칭확인을 수령하지 않은 상태여도 응답은 보내준다
                MatchingResponseDto notYetMatchedResponseDto = MatchingResponseDto
                        .builder()
                        .responseType(MatchingResponseType.MATCHING_CONFIRMED)
                        .message("매칭 확인을 수령했습니다.")
                        .data("")
                        .build();
                sendingOperation.convertAndSend("/sub/matching/status/"+myDto.getMemberId(), notYetMatchedResponseDto);
            }
        } else {
            log.info("매칭 취소됨 : {}", myDto.getMemberId());
            // 매칭이 취소된 경우, 매칭을 취소한 대상을 큐에서 제거한다.
            matchingService.removeFromMatchingQueue(myDto);
            matchingService.setMatchingStatusEnd(myDto.getMemberId());
            // 상대방의 매칭 중 상태도 해제해야함에 유의
            matchingService.setConfirmFalse(candidateDto);
            // 마지막으로 각각에게 응답을 보낸다
            MatchingResponseDto memberResponseDto = MatchingResponseDto
                    .builder()
                    .responseType(MatchingResponseType.MATCHING_CANCELED)
                    .message("매칭을 취소했습니다.")
                    .data(dto.getMemberDto())
                    .build();
            sendingOperation.convertAndSend("/sub/matching/status/"+myDto.getMemberId(), memberResponseDto);
            MatchingResponseDto candidateResponseDto = MatchingResponseDto
                    .builder()
                    .responseType(MatchingResponseType.MATCHING_CANDIDATE_CANCELED)
                    .message("상대방이 매칭을 취소했습니다. 다시 상대를 찾습니다.")
                    .data(dto.getCandidateDto())
                    .build();
            sendingOperation.convertAndSend("/sub/matching/status/"+candidateDto.getMemberId(), candidateResponseDto);
        }
    }

    @MessageMapping("/cancel")
    public void cancelMatching(MatchingCancelRequestDto dto) {
        log.info("매칭을 취소함 : {}", dto.getMemberId());
        matchingService.removeFromMatchingQueue(dto.getMemberDto());
        matchingService.setMatchingStatusEnd(dto.getMemberId());
        MatchingResponseDto cancelResponseDto = MatchingResponseDto
                .builder()
                .responseType(MatchingResponseType.MATCHING_CANCELED)
                .message("매칭을 취소했습니다.")
                .data(dto.getMemberDto())
                .build();
        sendingOperation.convertAndSend("/sub/matching/status/"+dto.getMemberId(), cancelResponseDto);
    }

    private void sendConfirm(MatchingInfoDto dto1, MatchingInfoDto dto2){
        // dto1에 대한 작업
        dto1 = dto1.toBuilder().inConfirm(true).build();
        MatchingConfirmResponseDto responseDto1 = MatchingConfirmResponseDto.builder()
                .myDto(dto1)
                .candidateDto(dto2)
                .build();
        MatchingResponseDto responseDto = MatchingResponseDto.builder()
                .responseType(MatchingResponseType.MATCHING_MATCHED)
                .message("매칭되었습니다. 확인해주세요.")
                .data(responseDto1)
                .build();
        sendingOperation.convertAndSend("/sub/matching/status/"+dto1.getMemberId(), responseDto);
        // dto2에 대한 작업
        dto2 = dto2.toBuilder().inConfirm(true).build();
        MatchingConfirmResponseDto responseDto2 = MatchingConfirmResponseDto.builder()
                .myDto(dto2)
                .candidateDto(dto1)
                .build();
        responseDto = MatchingResponseDto.builder()
                .responseType(MatchingResponseType.MATCHING_MATCHED)
                .message("매칭되었습니다. 확인해주세요.")
                .data(responseDto2)
                .build();
        sendingOperation.convertAndSend("/sub/matching/status/"+dto2.getMemberId(), responseDto);
        log.info("매칭 확인 요청 전송 완료 : {}, {}", dto1.getMemberId(), dto2.getMemberId());
    }

}
