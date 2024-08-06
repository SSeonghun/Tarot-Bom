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


    private final ChatRoomService chatRoomService;

    @MessageMapping("/message")
    public ResponseEntity<ResultResponse> message(ChatMessageReqDto message){
        chatRoomService.sendMessage(message);
        log.info("message2 : {} messageRoom : {} messageSender : {}", message.getMessage(), message.getRoomId(), message.getSenderId());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.COMMON_OK, message);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


}
