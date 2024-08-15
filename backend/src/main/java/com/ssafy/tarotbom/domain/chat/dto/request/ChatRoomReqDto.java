package com.ssafy.tarotbom.domain.chat.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public class ChatRoomReqDto {
//    private long roomId;
    private String roomId;
    private String roomName;




}
