package com.ssafy.tarotbom.domain.reservation.comtroller;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResoneseDto;
import com.ssafy.tarotbom.domain.reservation.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/add")
    public ResponseEntity<AddReservationsResoneseDto> addReservation(@Valid @RequestBody AddReservationsRequestDto addReservationsRequestDto){

        log.info("reservation Controller");
        AddReservationsResoneseDto addReservationsResoneseDto = reservationService.addReservation(addReservationsRequestDto);

        log.info("response : {} ", addReservationsResoneseDto.getRoomId());

        return null;
    }

}
