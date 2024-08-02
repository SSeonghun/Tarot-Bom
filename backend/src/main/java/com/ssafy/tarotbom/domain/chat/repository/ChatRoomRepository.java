//package com.ssafy.tarotbom.domain.chat.repository;
//
//import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
//import jakarta.annotation.PostConstruct;
//import org.springframework.stereotype.Repository;
//
//import java.util.HashMap;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//@Repository
//public class ChatRoomRepository {
//
//    private Map<String, ChatRoomReqDto> chatRoomMap;
//
//    @PostConstruct
//    private void init() {
//        chatRoomMap = new LinkedHashMap<>();
//    }
//
//    public ChatRoomReqDto findRoomById(String id) {
//        return chatRoomMap.get(id);
//    }
//
//    public ChatRoomReqDto createChatRoom(String name) {
//        ChatRoomReqDto chatRoom = ChatRoomReqDto.create(name);
//        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
//
//        return chatRoom;
//    }
//
//}
