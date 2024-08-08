package com.ssafy.tarotbom.domain.reservation.comtroller;

import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.service.ReservationService;
import com.ssafy.tarotbom.global.result.ResultCode;
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
    public ResponseEntity<AddReservationsResponseDto> addReservation(@Valid @RequestBody AddReservationsRequestDto addReservationsRequestDto){

        log.info("reservation Controller");
        AddReservationsResponseDto addReservationsResoneseDto = reservationService.addReservation(addReservationsRequestDto);

        log.info("response : {} ", addReservationsResoneseDto.getRoomId());

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(addReservationsResoneseDto);
    }

    /**
     * memberId로 검색하니까 리더 시커 구분 없이 예약 내역 조회
     * 리더가 리더예약도 하고 시커 예약도 하면?
     * @param request
     * @return
     */
    @GetMapping("/find")
    public ResponseEntity<List<ReadReservationResponseDto>> getReservationsByReader(HttpServletRequest request) {
        // Member 객체는 실제로는 서비스나 다른 방법으로 가져와야 합니다.

        List<ReadReservationResponseDto> reservations = reservationService.readReservation(request);

        log.info("size : {}", reservations.size());

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(reservations);
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
