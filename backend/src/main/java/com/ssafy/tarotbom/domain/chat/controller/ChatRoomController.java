package com.ssafy.tarotbom.domain.chat.controller;

import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import com.ssafy.tarotbom.domain.chat.repository.ChatRoomRepository;
import com.ssafy.tarotbom.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;


    @PostMapping("/room")
    public void createRoom(@RequestParam String roomName){
        chatRoomService.createRoom(roomName);
    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(@PathVariable String roomId, Model model){
        model.addAttribute("roomId", roomId);
        return "/chat/roomDetail";
    }

    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoomReqDto roomInfo(@PathVariable String roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }


}
