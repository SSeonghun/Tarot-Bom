package com.ssafy.tarotbom.domain.chat.controller;

import com.ssafy.tarotbom.domain.chat.dto.request.ChatMessageReqDto;
import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import com.ssafy.tarotbom.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatRoomService chatRoomService;

    @MessageMapping("/message")
    public void message(ChatMessageReqDto message){
        chatRoomService.sendMessage(message);
    }

    @PostMapping("/room")
    public void createRoom(@RequestParam String roomName){
        chatRoomService.createRoom(roomName);
    }

}
