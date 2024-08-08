package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ReservationService {


    AddReservationsResponseDto addReservation(AddReservationsRequestDto addReservationsRequestDto);
    List<ReadReservationResponseDto> readReservation(HttpServletRequest request);


    int deleteReservation(long reservationId);
}
