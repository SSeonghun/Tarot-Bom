package com.ssafy.tarotbom.domain.reservation.controller;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.request.UpdateReservationRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.FindReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.UpdateReservationResponseDto;
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
        List<ReadReservationResponseDto> reservations = reservationService.readReservation(request);
        log.info("size : {}", reservations.size());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.RESERVATION_FOUND, reservations);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 예약 수정 메서드
     * @param updateReservationRequestDto
     * @return UpdateReservationResponseDto
     * */
    @PutMapping("/{reservationId}")
    public ResponseEntity<ResultResponse> updateReservation(@PathVariable("reservationId") long reservationId,
                                                            @RequestBody UpdateReservationRequestDto updateReservationRequestDto,
                                                            HttpServletRequest request){
        UpdateReservationResponseDto updateReservationResponseDto = reservationService.updateReservation(reservationId, updateReservationRequestDto, request);
        log.info("reservation updated");
        ResultResponse resultResponse = ResultResponse.of(ResultCode.RESERVATION_UPDATED, updateReservationResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 예약 가능한 타임 조회(memberId 기반)
     * reservation Id, 시작 시간을 반환
     * */
    @GetMapping("/find/{readerId}")
    public ResponseEntity<ResultResponse> findReservations(@PathVariable("readerId") long readerId) {
        List<FindReservationResponseDto> reservations = reservationService.findReservation(readerId);
        log.info("get possible reservation -> {}", reservations.size());
        ResultResponse resultResponse = ResultResponse.of(ResultCode.RESERVATION_FOUND, reservations);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 예약 방 삭제
     * @param reservationId
     * @param request
     * @return
     */
    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> deleteReservation(@Valid @PathVariable long reservationId, HttpServletRequest request) {
        log.info("delete reservation - reservationId : {}" , reservationId);
        // 예약 번호 반환
        reservationService.deleteReservation(reservationId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.RESERVATION_DELETED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
