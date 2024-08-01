package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResoneseDto;

public interface ReservationService {


    AddReservationsResoneseDto addReservation(AddReservationsRequestDto addReservationsRequestDto);


}
