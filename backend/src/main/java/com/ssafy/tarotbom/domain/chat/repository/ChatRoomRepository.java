package com.ssafy.tarotbom.domain.chat.repository;

import com.ssafy.tarotbom.domain.chat.dto.request.ChatRoomReqDto;
import com.ssafy.tarotbom.domain.chat.service.SubscriberService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


@RequiredArgsConstructor
@Slf4j
@Repository
public class ChatRoomRepository {

//    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private Map<String, ChatRoomReqDto> chatRoomMap;

    //    private Map<String, ChannelTopic> topics;
//    private final SubscriberService subscriberService;


//    public ChatRoomRepository(RedisMessageListenerContainer redisMessageListenerContainer) {
//        this.redisMessageListenerContainer = redisMessageListenerContainer;
//    }

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public ChatRoomReqDto findRoomById(String id) {
        return chatRoomMap.get(id);
    }

//    public ChannelTopic getTopic(String roomId){
//        return topics.get(roomId);
//    }
//
//    public void enterChatRoom(String roomId){
//        ChannelTopic topic = topics.get(roomId);
//        if(topic == null){
//            topic = new ChannelTopic(roomId);
//            redisMessageListenerContainer.addMessageListener(subscriberService, topic);
//            topics.put(roomId, topic);
//        }
//    }

//    public ChatRoomReqDto createChatRoom(String name) {
//        ChatRoomReqDto chatRoom = ChatRoomReqDto.create(name);
//        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
//
//        return chatRoom;
//    }

}
