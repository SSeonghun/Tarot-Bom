package com.ssafy.tarotbom.domain.reservation.dto.request;

import com.ssafy.tarotbom.domain.room.entity.RoomStyle;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddReservationsRequestDto {
    private long seekerId;
    private long readerId;
    private LocalDateTime startTime;
    private int price;
    private String worry;
    private String keyword;
    private String roomStyle;
}
