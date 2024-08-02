package com.ssafy.tarotbom.domain.room.service;

import com.ssafy.tarotbom.domain.room.dto.request.RoomEnterRequestDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomOpenResponseDto;

public interface RoomService {
    public RoomOpenResponseDto openRoom(RoomOpenRequestDto dto);
    public String enterRoom(RoomEnterRequestDto dto);
}
