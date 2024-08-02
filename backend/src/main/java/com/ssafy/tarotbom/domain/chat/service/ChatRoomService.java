package com.ssafy.tarotbom.domain.chat.service;

import com.ssafy.tarotbom.domain.chat.dto.request.ChatMessageReqDto;
import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void createRoom(String roomName){

        String roomId = UUID.randomUUID().toString();
        ChatRoomReqDto chatRoom = ChatRoomReqDto.builder()
                .roomId(roomId)
                .roomName(roomName)
                .build();
        log.info("chatRoomId : {}, chatRoomName : {}", chatRoom.getRoomId(), chatRoom.getRoomName());
    }

    public void sendMessage(ChatMessageReqDto message){
        if(ChatMessageReqDto.MessageType.ENTER.equals(message.getMessageType())){
            message.setMessage(message.getSenderId()  + "님이 입장하였습니다.");
        }
        messagingTemplate.convertAndSend("sub/chat/room/" + message.getRoomId(), message);
    }
}
