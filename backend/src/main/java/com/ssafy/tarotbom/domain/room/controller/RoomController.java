package com.ssafy.tarotbom.domain.room.controller;

import com.ssafy.tarotbom.domain.room.dto.request.RoomEnterRequestDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.service.RoomService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping ("/room")
@Slf4j
public class RoomController {
    private final RoomService roomService;

    @PostMapping("/open")
    public ResponseEntity<ResultResponse> openRoom (@RequestBody RoomOpenRequestDto dto) {
        log.trace("room open");
        roomService.openRoom(dto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.ROOM_OPENED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/enter")
    public ResponseEntity<ResultResponse> enterRoom (@RequestBody RoomEnterRequestDto dto) {
        String result = roomService.enterRoom(dto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.ROOM_ENTERED, result);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
