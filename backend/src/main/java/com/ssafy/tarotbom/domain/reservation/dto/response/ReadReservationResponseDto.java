package com.ssafy.tarotbom.domain.reservation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReadReservationResponseDto {
    private long seekerId;
    private LocalDateTime startTime;
}
