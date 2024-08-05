package com.ssafy.tarotbom.domain.chat.dto.response;

import com.ssafy.tarotbom.domain.chat.dto.MessageType;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessageResDto {
    private MessageType messageType;
//    private long roomId;
    private String roomId;
    private long senderId; // 메시지 받을 사람(session에 있는 모든 채팅방의 사용자)
    private String message; // 메시지
}
