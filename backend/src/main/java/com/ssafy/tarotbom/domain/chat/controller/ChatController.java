package com.ssafy.tarotbom.domain.chat.controller;

import com.ssafy.tarotbom.domain.chat.dto.request.ChatMessageReqDto;
import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import com.ssafy.tarotbom.domain.chat.service.ChatRoomService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatController {

    /* [해야할 일]
    1) 서비스에서 메시지 보내기 금자
    2) request, response dto 분리
    3) ReponseEntity로 응답 금지 (웹소켓은 http가 아님)
    4) 응답 형식 통일 (이건 만들어서 주겠음)
    5) convertAndSend에서 맨 처음에 슬래쉬 붙이기
    +) 채팅 Redis에 저장
    +) WebSocket 프로토콜 과정 알아보기 (handshake 과정에서 http 사용한다는 거)
    * */

    private final ChatRoomService chatRoomService;

    @MessageMapping("/message")
    public ResponseEntity<ResultResponse> message(ChatMessageReqDto message){
        chatRoomService.sendMessage(message);
        log.info("message2 : {} messageRoom : {} messageSender : {}", message.getMessage(), message.getRoomId(), message.getSenderId());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.COMMON_OK, message);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


}
