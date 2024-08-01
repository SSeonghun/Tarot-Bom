package com.ssafy.tarotbom.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ObjectMapper objectMapper;
    private Map<String, ChatRoomReqDto> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>(); // 해시맵에 룸 정보 저장
    }

//    public ChatRoomReqDto findRoomById(long roomId){
    public ChatRoomReqDto findRoomById(String roomId){
        return chatRooms.get(roomId);
    }

    public ChatRoomReqDto createRoom(String roomName){
        // 해킹위험때문에 UUID를 쓰는데 어차피 화상방 안에 들어가야 되기 때문에 그냥 roomID로 하면 될듯
        String randomId = UUID.randomUUID().toString();

        // room 개설된 후 roomId를 가져오기
        // String roomId =

        ChatRoomReqDto chatRoom = ChatRoomReqDto.builder()
                .roomId(randomId)
                .roomName(roomName)
                .build();
        chatRooms.put(randomId, chatRoom);
        log.info(chatRoom.toString());
        return chatRoom;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message))); // 프론트에서 json으로 받아야 해서 직렬화
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }

    }

}
