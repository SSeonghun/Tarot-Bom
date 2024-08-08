package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationRepository;
import com.ssafy.tarotbom.domain.room.entity.Room;
import com.ssafy.tarotbom.domain.room.entity.RoomStyle;
import com.ssafy.tarotbom.domain.room.repository.RoomRepository;
import com.ssafy.tarotbom.domain.room.service.RoomService;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.global.code.entity.repository.CodeDetailRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
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

    /**
     * 예약 추가
     * @param addReservationsRequestDto
     * @return
     */
    @Override
    public AddReservationsResponseDto addReservation(AddReservationsRequestDto addReservationsRequestDto) {

        // 예약 시 방생성

        long seekerId = addReservationsRequestDto.getSeekerId();
        long readerId = addReservationsRequestDto.getReaderId();
        LocalDateTime startTime = addReservationsRequestDto.getStartTime();
        int price = addReservationsRequestDto.getPrice();
        String worry = addReservationsRequestDto.getWorry();
        String keyword_code = addReservationsRequestDto.getKeyword();
        String roomStyle = addReservationsRequestDto.getRoomStyle();

        log.info("addReservation : {}, {}", seekerId, readerId);
        log.info("keyword_code : {}" , keyword_code);

        String keyword = null;

        if (keyword_code.equals("G01")) { // 연애
            keyword = "연애";
        } else if (keyword_code.equals("G02")) { // 진로
            keyword = "진로";
        } else if (keyword_code.equals("G03")) { // 금전
            keyword = "금전";
        } else if (keyword_code.equals("G04")) { // 건강
            keyword = "건강";
        } else if (keyword_code.equals("G05")) { // 기타
            keyword = "기타";
        }

        CodeDetail keywords = CodeDetail
                .builder()
                .codeDetailId(keyword_code)
                .codeTypeId("10001")
                .detailDesc(keyword)
                .build();

        log.info("{} : ", keywords.getCodeDetailId());

        RoomStyle rooms = null;

        if(roomStyle.equals("CAM")) {
            rooms = RoomStyle.CAM;
        } else if (roomStyle.equals("GFX")) {
            rooms = RoomStyle.GFX;
        }

        Room room = Room
                .builder()
                .seekerId(seekerId)
                .readerId(readerId)
                .keyword(keywords)
                .keywords(keyword_code)
                .worry(worry)
                .roomStyle(rooms)
                .build();

        roomRepository.save(room);

        log.info("room : {}, {}", room.getRoomId(), room.getReaderId());

        long roomId = room.getRoomId();

        log.info("reservation : {}", seekerId);
        log.info("reservation : {}", price);
        log.info("reservation : {}", seekerId);
        log.info("reservation : {}", seekerId);

        // todo : db 설정후 변경
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
                .keyword(keywords)
                .price(price)
                .status(sts)
                .build();

        reservationRepository.save(reservation);

        AddReservationsResponseDto addReservationsResoneseDto = AddReservationsResponseDto
                .builder()
                .roomId(roomId)
                .build();

        return addReservationsResoneseDto;
    }

    /**
     * 예약 내역 확인
     * @param request
     * @return
     */
    @Override
    public List<ReadReservationResponseDto> readReservation(HttpServletRequest request) {

        long memberId = cookieUtil.getUserId(request);
        String memberType = cookieUtil.getMemberType(request);

        log.info("memberId : {}", memberId);

        List<Reservation> reservations = null;
        if(memberType.equals("M02")) {
            reservations = reservationRepository.findAllByReaderId(memberId);
        } else if (memberType.equals("M01")) {
            reservations = reservationRepository.findAllBySeekerId(memberId);
        }

        log.info("reservations_reader : {}", reservations.size());
        
        // ReadReservationResponseDto로 변환
        // 남은 예약 내역은 시간으로 판단
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
            throw new BusinessException(ErrorCode.COMMON_NOT_FOUND);
        }

    }


}
