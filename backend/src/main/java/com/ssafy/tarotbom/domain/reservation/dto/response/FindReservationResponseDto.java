package com.ssafy.tarotbom.domain.reservation.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class FindReservationResponseDto {
    private long reservationId;
    private LocalDateTime startTime;
}
