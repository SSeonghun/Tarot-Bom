package com.ssafy.tarotbom.domain.matching.service;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import com.ssafy.tarotbom.domain.room.dto.request.RoomOpenRequestDto;
import com.ssafy.tarotbom.domain.room.dto.response.RoomOpenResponseDto;
import com.ssafy.tarotbom.domain.room.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
@Slf4j
public class MatchingServiceImpl implements MatchingService {

    private final BlockingQueue<MatchingInfoDto> readerMatchingQueue;
    private final BlockingQueue<MatchingInfoDto> seekerMatchingQueue;
    private final MatchingRedisService redisService;
    private final MatchingRedisService matchingRedisService;
    private final RoomService roomService;

    @Value("${matching.status.key}")
    private String matchingStatusKey;

    @Value("${matching.confirm.key}")
    private String matchingConfirmKey;

    // List 할당을 위한 생성자 수동 작성
    public MatchingServiceImpl(MatchingRedisService redisService,
                               MatchingRedisService matchingRedisService,
                               RoomService roomService) {
        readerMatchingQueue = new LinkedBlockingQueue<>();
        seekerMatchingQueue = new LinkedBlockingQueue<>();
        this.redisService = redisService;
        this.matchingRedisService = matchingRedisService;
        this.roomService = roomService;
    }

    /**
     * <pre>
     * public boolean setMatchingStatusStart(long memberId)
     * 입력된 멤버가 매칭중임을 표기합니다.
     * 이미 매칭 중인 멤버라면 false를 반환합니다.
     * </pre>
     */
    @Override
    public boolean setMatchingStatusStart(long memberId) {
        return redisService.setMatchingStatusStart(matchingStatusKey, memberId);
    }

    /**
     * <pre>
     * public boolean setMatchingStatusStart(long memberId)
     * 입력된 멤버가 매칭중이 아님을 표기합니다.
     * 매칭 DB에 들어가있지 않은 멤버라면 false를 반환합니다.
     * </pre>
     */
    @Override
    public boolean setMatchingStatusEnd(long memberId) {
        return redisService.setMatchingStatusEnd(matchingStatusKey, memberId);
    }

    /**
     * <pre>
     * public MatchingInfoDto searchToMatching(MatchingInfoDto dto)
     * 입력된 정보를 기반으로 매칭이 되는 상대가 있는지를 확인합니다.
     * 매칭되는 상대가 있다면 그 정보가 담긴 객체를, 없다면 null을 반환합니다.
     * </pre>
     */
    @Override
    public MatchingInfoDto searchToMatching(MatchingInfoDto myDto) {
        BlockingQueue<MatchingInfoDto> searchQueue;
        // 현재 dto가 seeker라면 reader 큐에서, reader라면 그 반대의 큐에서 찾아야 한다


        if (myDto.getMemberType().equals("reader")) {
            log.info("seekerMatchingQueue");
            searchQueue = seekerMatchingQueue;
        } else {
            log.info("ReaderMatchingQueue");
            searchQueue = readerMatchingQueue;
        }
        log.info("searchQueue size : {}",searchQueue.size());
        // 매칭 상대를 찾기 위한 큐 순회 시작
        synchronized(searchQueue) {
            for (MatchingInfoDto candidateDto : searchQueue) {
                if (isMatched(candidateDto, myDto)) {
                    // 매칭 상대를 찾았다면, 해당 후보를 return하고 메서드를 종료한다
                    candidateDto.switchConfirm();
                    return candidateDto;
                }
            }
        }
        // 전부 순회해도 찾을 수 없었다면 null을 반환
        return null;
    }

    /**
     * <pre>
     * public boolean offerToMatchingQueue(MatchingInfoDto dto)
     * 입력된 정보를 기반으로 큐에 dto를 삽입합니다.
     * 실패했다면 false를 반환합니다.
     * </pre>
     */
    @Override
    public boolean offerToMatchingQueue(MatchingInfoDto dto) {
        BlockingQueue<MatchingInfoDto> putQueue;
        if(dto.getMemberType().equals("reader")){
            putQueue = readerMatchingQueue;
        } else {
            putQueue = seekerMatchingQueue;
        }
        return putQueue.offer(dto);
    }
    /**
     * <pre>
     * public void removeFromMatchingQueue(MatchingInfoDto ...dto)
     * 입력된 정보를 기반으로 큐에서 dto를 제거합니다.
     * </pre>
     */
    public void removeFromMatchingQueue(MatchingInfoDto ...dto) {
        BlockingQueue<MatchingInfoDto> removeQueue;
        for(MatchingInfoDto removeDto : dto) {
            if(removeDto.getMemberType().equals("reader")){
                removeQueue = readerMatchingQueue;
            } else {
                removeQueue = seekerMatchingQueue;
            }
            if(!removeQueue.remove(removeDto)) {
                // 실패한 경우 로그 출력
                log.info("큐에서 dto 지우기 실패 : {} ", removeDto.getMemberId());
            }
            log.info("{}", removeQueue.peek());
        }
    }

    /**
     * <pre>
     * public boolean confirmMatching(MatchingInfoDto myDto, MatchingInfoDto candidateDto)
     * myDto를 기반으로 candidateDto간의 매칭 확인을 시행합니다.
     * 상대도 매칭을 확인한 상태라면 true를 반환합니다.
     * </pre>
     */
    @Override
    public boolean confirmMatching(MatchingInfoDto myDto, MatchingInfoDto candidateDto) {
        // 현재 member를 확인 db에 넣음과 동시에 상대방이 매칭을 확인했는지 체크
        if(matchingRedisService.confirmMatching(matchingConfirmKey, myDto.getMemberId(), candidateDto.getMemberId())){
            log.info("매칭 성사 : {} - {}", myDto.getMemberId(), candidateDto.getMemberId());
            matchingRedisService.removeFromConfirm(matchingConfirmKey, myDto.getMemberId(), candidateDto.getMemberId());
            return true;
        } else { // 상대방이 아직 매칭을 확인하지 않았다면 false를 반환
            return false;
        }
    }

    /**
     * <pre>
     * public void setConfirmFalse(MatchingInfoDto dto)
     * dto와 같은 정보를 담고 있는 객체를 매칭 큐에서 찾은 후, 그 객체의 매칭 확인중 표시를 해제합니다.
     * </pre>
     */
    @Override
    public void setConfirmFalse(MatchingInfoDto dto) {
        BlockingQueue<MatchingInfoDto> searchQueue;
        if(dto.getMemberType().equals("reader")){
            searchQueue = readerMatchingQueue;
        } else {
            searchQueue = seekerMatchingQueue;
        }
        //
        synchronized(searchQueue) {
            for (MatchingInfoDto candidateDto : searchQueue) {
                if(candidateDto.equals(dto)) {
                    candidateDto.switchConfirm();
                    return;
                }
            }
        }

    }

    /**
     * <pre>
     * public long openMatchingRoom(MatchingInfoDto myDto, MatchingInfoDto candidateDto)
     * myDto, candidateDto 유저가 사용할 방을 생성하고 roomId를 반환합니다.
     * </pre>
     */
    @Override
     public long openMatchingRoom(MatchingInfoDto myDto, MatchingInfoDto candidateDto) {
        long readerId, seekerId;
        String worry;
        if(myDto.getMemberType().equals("reader")){
            readerId = myDto.getMemberId();
            seekerId = candidateDto.getMemberId();
            worry = candidateDto.getWorry();
        } else {
            readerId = candidateDto.getMemberId();
            seekerId = myDto.getMemberId();
            worry = myDto.getWorry();
        }
        // 예약식이 아니므로 reservationId는 생략
        RoomOpenRequestDto roomOpenRequestDto = RoomOpenRequestDto.builder()
                .roomType("random")
                .readerId(readerId)
                .seekerId(seekerId)
                .keyword(myDto.getKeyword())
                .worry(worry)
                .roomStyle(myDto.getRoomStyle())
                .build();
        RoomOpenResponseDto resultDto = roomService.openRoom(roomOpenRequestDto);
        return resultDto.getRoomId();
    }

    // 매칭 성립 조건 : keyword, roomStyle이 동일하며, memberType는 매칭 요청 대상자와 반대여야 한다
    private boolean isMatched(MatchingInfoDto searchingDto, MatchingInfoDto myDto) {
        return searchingDto.getKeyword().equals(myDto.getKeyword())
                && searchingDto.getRoomStyle().equals(myDto.getRoomStyle())
                && !searchingDto.isInConfirm(); // 매칭 확인중인 객체는 대상에 포함하지 x
    }
}

