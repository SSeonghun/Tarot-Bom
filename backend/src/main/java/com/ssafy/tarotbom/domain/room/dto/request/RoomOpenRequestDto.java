package com.ssafy.tarotbom.domain.room.dto.request;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomOpenRequestDto {
    private String roomType;
    private long readerId;
    private long seekerId;
    private String keyword;
    private String worry;
    private String roomStyle;
    private long reservationId;
}
