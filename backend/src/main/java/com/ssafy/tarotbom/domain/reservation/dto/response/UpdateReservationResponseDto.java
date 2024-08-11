package com.ssafy.tarotbom.domain.reservation.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UpdateReservationResponseDto {
    private long reservationId;
    private Long roomId;
    private Long seekerId;
    private long readerId;
    private String status;
    private String keyword;
    private int price;
    private LocalDateTime startTime;
}
