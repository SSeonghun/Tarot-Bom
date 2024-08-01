package com.ssafy.tarotbom.domain.chat.controller;

import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import com.ssafy.tarotbom.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @PostMapping
    public ChatRoomReqDto createRoom(@RequestBody String roomName) {
        return chatService.createRoom(roomName);
    }


}
