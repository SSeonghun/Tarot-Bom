package com.ssafy.tarotbom.domain.room.service;

import com.ssafy.tarotbom.domain.openvidu.service.OpenviduService;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationRepository;
import com.ssafy.tarotbom.domain.room.dto.request.RoomEnterRequestDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomOpenResponseDto;
import com.ssafy.tarotbom.domain.room.entity.Room;
import com.ssafy.tarotbom.domain.room.entity.RoomStyle;
import com.ssafy.tarotbom.domain.room.repository.RoomRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    private final OpenviduService openviduService;

    /** <pre>
     * public void oepnRoom(RoomOpenRequestDto dto)
     * dto로 입력된 정보를 기반으로 화상방을 생성합니다.
     * 실제로 WebRTC 플랫폼에서 방이 생성되었는가와 관계없이, 시스템상 방이 '등록되었다'고 인지시키는 과정입니다.
     * </pre>
     * */
    @Override
    public RoomOpenResponseDto openRoom(RoomOpenRequestDto dto) {
        String roomType = dto.getRoomType();
        Reservation res = null;
        // 만일 예약을 기반으로 방을 생성하는 거라면, 기존 예약 정보에 방 ID가 포함되어있는지 확인 必
        if(roomType.equals("reserve")){
            res = reservationRepository.findByReservationId(dto.getReservationId());
            if(res.getRoomId() != null){
                throw new BusinessException(ErrorCode.ROOM_RESERVED_ALREADY_EXISTS);
            }
        }
        RoomStyle roomStyle;
        if(dto.getRoomStyle().equals("CAM")){
            roomStyle = RoomStyle.CAM;
        } else{
            roomStyle = RoomStyle.GFX;
        }
        Room room = Room.builder()
                .readerId(dto.getReaderId())
                .seekerId(dto.getSeekerId())
                .keywords(dto.getKeyword())
                .worry(dto.getWorry())
                .roomStyle(roomStyle)
                .build();
        Room savedRoom = roomRepository.save(room); // 제공받은 정보를 기반으로 room insert
        // 예약이었던 경우, 예약정보를 변경해줘야 한다
        if(roomType.equals("reserve")){
            reservationRepository.save(res.toBuilder().roomId(savedRoom.getRoomId()).build());
        }

        /*
         * 예약 서비스에서 룸 아이디를 받아야 해서
         * DTO 만들어서 보냄
         */
        RoomOpenResponseDto roomOpenResponseDto = RoomOpenResponseDto
                .builder()
                .roomId(room.getRoomId())
                .build();

        return roomOpenResponseDto;
    }

    /** <pre>
     * public String enterRoom(RoomEtnerRequestDto dto)
     * dto로 입력된 정보를 기반으로 방 입장을 처리를 합니다.
     * 해당 roomId에 사용자가 입장 권한을 가지고 있는지, 혹은 이미 종료된 방인지를 판정한 후, 입장토큰을 반환합니다.
     * </pre>  */
    @Override
    public String enterRoom(RoomEnterRequestDto dto) {
        // 방 유효성 검사를 위해 room 객체 검색
        Room room = roomRepository.findByRoomId(dto.getRoomId());
        if(room == null) {
            // 검색결과가 없다면 찾을 수 없음을 throw
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND);
        }
        if(room.getSeekerId() != dto.getUserId() && room.getReaderId() != dto.getUserId()) {
            // 이 유저가 접속할 수 없는 방인 경우, 에러 발생
            throw new BusinessException(ErrorCode.ROOM_NOT_YOUR_ROOM);
        }
        // 검증이 되었다면, 그 방에는 입장할 수 있는 것이다
        return openviduService.getToken(dto.getUserId(), dto.getRoomId());
    }
}
