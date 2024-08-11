package com.ssafy.tarotbom.domain.reservation.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UpdateReservationRequestDto {
    private Long seekerId;
    private String status;
    private String keyword;
    private Integer price;
    private LocalDateTime startTime;
}
