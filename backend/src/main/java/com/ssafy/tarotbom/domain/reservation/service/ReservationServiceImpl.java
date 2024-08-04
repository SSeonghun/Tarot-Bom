package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResoneseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationRepository;
import com.ssafy.tarotbom.domain.room.entity.Room;
import com.ssafy.tarotbom.domain.room.repository.RoomRepository;
import com.ssafy.tarotbom.domain.room.service.RoomService;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.global.code.entity.repository.CodeDetailRepository;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepository reservationRepository;
    private final RoomService roomService;
    private final CodeDetailRepository codeDetailRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final CookieUtil cookieUtil;

    @Override
    public AddReservationsResoneseDto addReservation(AddReservationsRequestDto addReservationsRequestDto) {

        // 예약 시 방생성

        long seekerId = addReservationsRequestDto.getSeekerId();
        long readerId = addReservationsRequestDto.getReaderId();
        LocalDateTime startTime = addReservationsRequestDto.getStartTime();
        int price = addReservationsRequestDto.getPrice();
        String worry = addReservationsRequestDto.getWorry();
        CodeDetail keyword = addReservationsRequestDto.getKeyword();
        CodeDetail roomStyle = addReservationsRequestDto.getRoomStyle();

        log.info("addReservation : {}, {}", seekerId, readerId);

        Room room = Room.builder().seekerId(seekerId).readerId(readerId).keyword(keyword).build();

        roomRepository.save(room);

        log.info("room : {}, {}", room.getRoomId(), room.getReaderId());

//        RoomOpenRequestDto roomOpenRequestDto = RoomOpenRequestDto
//                .builder()
//                .readerId(readerId)
//                .seekerId(seekerId)
//                .keyword(keyword)
//                .worry(worry)
//                .roomStyle(roomStyle)
//                .build();
//
//        RoomOpenResponseDto roomOpenResponseDto = roomService.openRoom(roomOpenRequestDto);


        long roomId = room.getRoomId();

        log.info("reservation : {}", seekerId);
        log.info("reservation : {}", price);
        log.info("reservation : {}", seekerId);
        log.info("reservation : {}", seekerId);

        CodeDetail sts = CodeDetail
                .builder()
                .codeDetailId("R00")
                .codeTypeId("2")
                .detailDesc("예약")
                .build();

        sts = codeDetailRepository.save(sts);

        Member seeker = memberRepository.findById(seekerId)
                .orElseThrow(() -> new RuntimeException("Seeker not found"));

//        CodeDetail status = codeDetailRepository.findById(statusCode).orElseThrow(() -> new RuntimeException("Status not found"));

        log.info("sts : {}", sts.getCodeTypeId());
        log.info("reader_id : {}", readerId);
        log.info("seacker_id : {}", seekerId);

        Reservation reservation = Reservation
                .builder()
                .roomId(roomId)
                .seeker(seeker)
                .seekerId(seekerId)
                .readerId(readerId)
                .startTime(startTime)
                .price(price)
                .status(sts)
                .build();

        reservationRepository.save(reservation);

        AddReservationsResoneseDto addReservationsResoneseDto = AddReservationsResoneseDto
                .builder()
                .roomId(roomId)
                .build();

        return addReservationsResoneseDto;
    }

    @Override
    public List<ReadReservationResponseDto> readReservation(HttpServletRequest request) {

        long memberId = cookieUtil.getUserId(request);
        String memberType = cookieUtil.getMemberType(request);

        log.info("memberId : {}", memberId);

        List<Reservation> reservations = null;

        if(memberType.equals("M03")) {
            reservations = reservationRepository.findAllByReaderId(memberId);
        } else if (memberType.equals("M01")) {
            reservations = reservationRepository.findAllBySeekerId(memberId);
        }

        log.info("reservations_reader : {}", reservations.size());

        // ReadReservationResponseDto로 변환
        return reservations.stream()
                .map(reservation -> ReadReservationResponseDto.builder()
                        .reservationId(reservation.getReservationId())
                        .seekerId(reservation.getSeekerId())
                        .startTime(reservation.getStartTime())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public int deleteReservation(long reservationId) {

        try {
            reservationRepository.deleteById(reservationId);
            return 1;
        } catch (Exception e) {
            // todo: 오류 처리
            return 0;
        }

    }


}
