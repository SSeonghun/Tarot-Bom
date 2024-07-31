package com.ssafy.tarotbom.domain.room.dto.request;

import lombok.Getter;

@Getter
public class RoomOpenRequestDto {
    private String roomType;
    private long readerId;
    private long seekerId;
    private String keyword;
    private String worry;
    private String roomStyle;
    private long reservationId;
}
