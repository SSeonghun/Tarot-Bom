package com.ssafy.tarotbom.domain.matching.service;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
@Slf4j
public class MatchingServiceImpl implements MatchingService {

    private final BlockingQueue<MatchingInfoDto> readerMatchingQueue;
    private final BlockingQueue<MatchingInfoDto> seekerMatchingQueue;
    private final MatchingRedisService redisService;

    @Value("${matching.status.key}")
    private String matchingStatusKey;

    // List 할당을 위한 생성자 수동 작성
    public MatchingServiceImpl(MatchingRedisService redisService) {
        readerMatchingQueue = new LinkedBlockingQueue<>();
        seekerMatchingQueue = new LinkedBlockingQueue<>();
        this.redisService = redisService;
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
            searchQueue = seekerMatchingQueue;
        } else {
            searchQueue = readerMatchingQueue;
        }

        // 매칭 상대를 찾기 위한 큐 순회 시작
        for (MatchingInfoDto candidateDto : searchQueue) {
            if (isMatched(candidateDto, myDto)) {
                // 매칭 상대를 찾았다면, 해당 후보를 return하고 메서드를 종료한다
                return candidateDto;
            }
        }
        // 전부 순회해도 찾을 수 없었다면 null을 반환
        return null;
    }


    // 매칭 성립 조건 : keyword, roomStyle이 동일하며, memberType는 매칭 요청 대상자와 반대여야 한다
    private boolean isMatched(MatchingInfoDto searchingDto, MatchingInfoDto myDto) {
        return searchingDto.getKeyword().equals(myDto.getKeyword())
                && searchingDto.getRoomStyle().equals(myDto.getRoomStyle());
    }
}

