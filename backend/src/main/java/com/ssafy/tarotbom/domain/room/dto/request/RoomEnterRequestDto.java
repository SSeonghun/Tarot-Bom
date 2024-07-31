package com.ssafy.tarotbom.domain.room.dto.request;

import lombok.Getter;

@Getter
public class RoomEnterRequestDto {
    private String userType;
    private long userId;
    private long roomId;
}
