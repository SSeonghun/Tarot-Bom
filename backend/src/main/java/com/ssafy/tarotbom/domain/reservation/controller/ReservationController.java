package com.ssafy.tarotbom.domain.reservation.controller;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.service.ReservationService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
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

    /**
     * 예약 추가 메서드
     * @param addReservationsRequestDto
     * @return
     */
    @PostMapping("/add")
    public ResponseEntity<ResultResponse> addReservation(@Valid @RequestBody AddReservationsRequestDto addReservationsRequestDto){
        log.info("reservation Controller");
        AddReservationsResponseDto addReservationsResponseDto = reservationService.addReservation(addReservationsRequestDto);
        log.info("response : {} ", addReservationsResponseDto.getRoomId());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.RESERVATION_ADDED, addReservationsResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 예약 조회 메서드
     * 현재 유저의 토큰에 기록된 시커/리더 여부에 따라 다른 결과를 전송
     * @param request
     * @return
     */
    @GetMapping("/find")
    public ResponseEntity<ResultResponse> getReservations(HttpServletRequest request) {
        // todo : 예약정보 송출할 때 단순 ID만 송출하지 말고, 여러 정보 담아서 보내기
        List<ReadReservationResponseDto> reservations = reservationService.readReservation(request);
        log.info("size : {}", reservations.size());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.RESERVATION_FOUND, reservations);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 
     * 클라이언트가 reservationId를 가지고 있지 않음
     * 리더, 시커 아이디 랑 시작 시간 정보로 삭제 해야 할듯
     * roomID는 고유 값이니 이걸로 삭제 하면 될듯
     * 
     * @param reservationId
     * @param request
     * @return
     */
    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> deleteReservation(@Valid @PathVariable long reservationId, HttpServletRequest request) {

        log.info("reservationId : {}" , reservationId);
        // 예약 번호 반환
        reservationService.deleteReservation(reservationId);

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body("삭제완료");
    }

}
