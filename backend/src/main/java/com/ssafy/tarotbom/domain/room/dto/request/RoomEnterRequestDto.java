package com.ssafy.tarotbom.domain.room.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class RoomEnterRequestDto {
    private String userType;
    private long userId;
    private long roomId;
}
