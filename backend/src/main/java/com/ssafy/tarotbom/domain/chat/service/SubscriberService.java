package com.ssafy.tarotbom.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.tarotbom.domain.chat.dto.response.ChatMessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

// Topic별 메시지 전송 분리
@Slf4j
@RequiredArgsConstructor
@Service
public class SubscriberService implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    // Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 역직렬화
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());

            // ChatMessgeResDto 객체로 맵핑
            ChatMessageResDto roomMessage = objectMapper.readValue(publishMessage, ChatMessageResDto.class);

            // Websocket 구독자에게 채팅 메시지 Send
            messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);

        }catch(Exception e) {
            log.error(e.getMessage());
        }
    }
}
