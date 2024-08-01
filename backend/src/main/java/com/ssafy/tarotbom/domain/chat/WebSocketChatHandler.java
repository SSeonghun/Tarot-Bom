package com.ssafy.tarotbom.domain.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import com.ssafy.tarotbom.domain.chat.dto.response.ChatMessageResDto;
import com.ssafy.tarotbom.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
       String payload = message.getPayload();
       log.info("payload: {}", payload);
//       TextMessage textMessage = new TextMessage("Welcome chatting server");
//       session.sendMessage(textMessage);

       ChatMessageResDto chatMessage = objectMapper.readValue(payload, ChatMessageResDto.class);
       log.info("chatMessage: {}", chatMessage);
       ChatRoomReqDto room = chatService.findRoomById(chatMessage.getRoomId());
       log.info("room: {}", room);
       room.handleActions(session, chatMessage, chatService); // 룸에 들어온 클라이언트들에게 메일 발송
    }
}
