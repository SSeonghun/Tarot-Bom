package com.ssafy.tarotbom.domain.chat.dto.request;

import com.ssafy.tarotbom.domain.chat.dto.MessageType;
import com.ssafy.tarotbom.domain.chat.dto.response.ChatMessageResDto;
import com.ssafy.tarotbom.domain.chat.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoomReqDto {
//    private long roomId;
    private String roomId;
    private String roomName;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
//    public ChatRoomReqDto(long roomId, String roomName) {
    public ChatRoomReqDto(String roomId, String roomName) {
        this.roomId = roomId;
        this.roomName = roomName;
    }

    public void handleActions(WebSocketSession session, ChatMessageResDto chatMessage, ChatService chatService) {
        if(chatMessage.getMessageType().equals(MessageType.ENTER)){
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSenderId() + "님이 입장했습니다." );
        }
        sendMessage(chatMessage, chatService);
    }

    public <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
    }
}
