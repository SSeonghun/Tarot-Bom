package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.request.UpdateReservationRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.FindReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.UpdateReservationResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ReservationService {
    AddReservationsResponseDto addReservation(AddReservationsRequestDto addReservationsRequestDto);
    List<ReadReservationResponseDto> readReservation(HttpServletRequest request);
    List<FindReservationResponseDto> findReservation(long readerId);
    UpdateReservationResponseDto updateReservation(long reservationId, UpdateReservationRequestDto updateReservationRequestDto, HttpServletRequest request);
    void deleteReservation(long reservationId);
}
