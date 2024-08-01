package com.ssafy.tarotbom.domain.reservation.comtroller;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResoneseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/reader")
    public List<ReadReservationResponseDto> getReservationsByReader(HttpServletRequest request) {
        // Member 객체는 실제로는 서비스나 다른 방법으로 가져와야 합니다.

        List<ReadReservationResponseDto> reservations = reservationService.readReservation(request);

        log.info("size : {}", reservations.size());

        return null;
    }

}
