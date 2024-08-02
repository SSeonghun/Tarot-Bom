package com.ssafy.tarotbom.domain.reservation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Builder
@Slf4j
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddReservationsResoneseDto {
    private long roomId;
//    private String state;
}
