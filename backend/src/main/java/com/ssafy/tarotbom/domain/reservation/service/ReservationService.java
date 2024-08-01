package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResoneseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ReservationService {


    AddReservationsResoneseDto addReservation(AddReservationsRequestDto addReservationsRequestDto);
    List<ReadReservationResponseDto> readReservation(HttpServletRequest request);


}
