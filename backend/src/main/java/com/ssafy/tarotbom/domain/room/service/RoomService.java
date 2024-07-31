package com.ssafy.tarotbom.domain.room.service;

import com.ssafy.tarotbom.domain.room.dto.request.RoomEnterRequestDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;

public interface RoomService {
    public void openRoom(RoomOpenRequestDto dto);
    public String enterRoom(RoomEnterRequestDto dto);
}
