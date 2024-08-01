package com.ssafy.tarotbom.domain.room.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RoomOpenResponseDto {
    private long roomId;
}
