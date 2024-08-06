package com.ssafy.tarotbom.domain.room.controller;

import com.ssafy.tarotbom.domain.room.dto.request.RoomEnterRequestDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomEnterResponseDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomOpenResponseDto;
import com.ssafy.tarotbom.domain.room.service.RoomService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
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
    private final CookieUtil cookieUtil;

    @PostMapping("/open")
    public ResponseEntity<ResultResponse> openRoom (@RequestBody RoomOpenRequestDto dto) {
        log.info("room open");
        RoomOpenResponseDto roomOpenResponseDto = roomService.openRoom(dto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.ROOM_OPENED, roomOpenResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/enter")
    public ResponseEntity<ResultResponse> enterRoom (@RequestBody RoomEnterRequestDto dto, HttpServletRequest request) {
        // userType, userID를 cookie의 내용물로 변경한다.
        dto = dto.toBuilder().userType(cookieUtil.getMemberType(request)).userId(cookieUtil.getUserId(request)).build();
        String token = roomService.enterRoom(dto);
        RoomEnterResponseDto roomEnterResponseDto = RoomEnterResponseDto.builder()
                .token(token)
                .build();
        ResultResponse resultResponse = ResultResponse.of(ResultCode.ROOM_ENTERED, roomEnterResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
