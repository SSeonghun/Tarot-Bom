package com.ssafy.tarotbom.domain.chat.dto.request;

import com.ssafy.tarotbom.domain.chat.dto.MessageType;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessageReqDto {
    private MessageType messageType;
//    private long roomId;
    private String roomId;
    private long senderId; // 메시지 보낸 사람
    private String message; // 메시지
}
