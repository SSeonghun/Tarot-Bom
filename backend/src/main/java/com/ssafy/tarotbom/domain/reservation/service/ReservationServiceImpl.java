package com.ssafy.tarotbom.domain.reservation.service;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.reservation.dto.request.AddReservationsRequestDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.AddReservationsResponseDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationQueryRepository;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationRepository;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomOpenResponseDto;
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
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepository reservationRepository;
    private final RoomService roomService;
    private final MemberRepository memberRepository;
    private final CookieUtil cookieUtil;
    private final ReaderRepository readerRepository;
    private final ReservationQueryRepository reservationQueryRepository;

    /**
     * 예약 추가
     * @param addReservationsRequestDto
     * @return
     */
    @Override
    public AddReservationsResponseDto addReservation(AddReservationsRequestDto addReservationsRequestDto) {
        String status = "R01";
        if(addReservationsRequestDto.getStatus() != null) {
            // 만일 입력으로 들어온 예약상태가 있다면 그 내용으로 갱신한다
            status = addReservationsRequestDto.getStatus();
        }
        long seekerId = addReservationsRequestDto.getSeekerId();
        long readerId = addReservationsRequestDto.getReaderId();
        log.info("sts : {}", status);
        log.info("reader_id : {}", readerId);
        log.info("seeker_id : {}", seekerId);

        // 입력받은 readerId, seekerId가 유효한지 검사
        if(!readerRepository.existsByMemberId(readerId) || (seekerId != 0 && !memberRepository.existsByMemberId(seekerId))) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }
        Reservation reservation = Reservation
                .builder()
                .seekerId(seekerId)
                .readerId(readerId)
                .startTime(addReservationsRequestDto.getStartTime())
                .keywordCode(addReservationsRequestDto.getKeyword())
                .price(addReservationsRequestDto.getPrice())
                .statusCode(status)
                .build();

        reservation = reservationRepository.save(reservation);
        log.info("예약 생성 : {}", reservation.getReservationId());
        // 예약을 등록한 후, 그에 맞게 room을 생성한다
        RoomOpenRequestDto openRoomRequestDto = RoomOpenRequestDto.builder()
                .roomType("reserve")
                .readerId(readerId)
                .seekerId(seekerId)
                .keyword(addReservationsRequestDto.getKeyword())
                .worry(addReservationsRequestDto.getWorry())
                .roomStyle(addReservationsRequestDto.getRoomStyle())
                .reservationId(reservation.getReservationId())
                .build();
        RoomOpenResponseDto roomOpenResponseDto = roomService.openRoom(openRoomRequestDto);
        AddReservationsResponseDto addReservationsResponseDto = AddReservationsResponseDto
                .builder()
                .roomId(roomOpenResponseDto.getRoomId())
                .build();
        return addReservationsResponseDto;
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
        List<Reservation> reservations = reservationQueryRepository.findFilter(memberType, memberId);

        log.info("reservations size : {}", reservations.size());

        List<ReadReservationResponseDto> respondList = new ArrayList<>();
        for(Reservation reservation : reservations) {
            respondList.add(
                    ReadReservationResponseDto.builder()
                            .reservationId(reservation.getReservationId())
                            .seekerId(reservation.getSeekerId())
                            .seekerName(reservation.getSeeker().getNickname())
                            .seekerProfileUrl(reservation.getSeeker().getProfileUrl())
                            .readerId(reservation.getReaderId())
                            .readerName(reservation.getReader().getNickname())
                            .readerProfileUrl(reservation.getReader().getProfileUrl())
                            .status(reservation.getStatusCode())
                            .keyword(reservation.getKeywordCode())
                            .startTime(reservation.getStartTime())
                            .build()
            );
        }
        return respondList;
    }

    @Override
    @Transactional
    public void deleteReservation(long reservationId) {
        if(reservationRepository.deleteAllByReservationId(reservationId) == 0){
            throw new BusinessException(ErrorCode.RESERVATION_NOT_FOUND);
        }
    }
}
