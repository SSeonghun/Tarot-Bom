package com.ssafy.tarotbom.domain.matching.service;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;
import com.ssafy.tarotbom.global.error.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    /** <pre>
     * public boolean setMatchingStatusStart(long memberId)
     * 입력된 멤버가 매칭중임을 표기합니다.
     * 이미 매칭 중인 멤버라면 false를 반환합니다.
     * </pre>
     * */
    @Override
    public boolean setMatchingStatusStart(long memberId) {
        return redisService.setMatchingStatusStart(matchingStatusKey, memberId);
    }

    /** <pre>
     * public boolean setMatchingStatusStart(long memberId)
     * 입력된 멤버가 매칭중이 아님을 표기합니다.
     * 매칭 DB에 들어가있지 않은 멤버라면 false를 반환합니다.
     * </pre>
     * */
    @Override
    public boolean setMatchingStatusEnd(long memberId) {
        return redisService.setMatchingStatusEnd(matchingStatusKey, memberId);
    }

    /** <pre>
     * public void startMatching(long memberId, String memberType)
     * 입력된 정보를 기반으로 매칭을 시작합니다.
     * </pre>
     * */
    @Override
    public boolean startMatching(MatchingStartRequestDto dto) {
        // [0] 이미 매칭 중인 멤버인지 확인함과 동시에 매칭중임을 표기
        // 만일 이미 매칭 중인 멤버라면 돌려보낸다.
        if(!setMatchingStatusStart(dto.getMemberId())){
            // return false;
        }

        // [1] 매칭 조건이 동일한 상대가 있는지 확인
        // 매칭할 수 있는 상대가 있다면, 해당 매칭 상대를 매칭 큐에서 제외한 후, 매칭 확인 파트로 넘어간다
        long seekerId = 0;
        long readerId = 0;
        BlockingQueue<MatchingInfoDto> searchQueue;
        if(dto.getMemberType().equals("reader")){
            searchQueue = seekerMatchingQueue;
            readerId = dto.getMemberId();
        } else {
            searchQueue = readerMatchingQueue;
            seekerId = dto.getMemberId();
        }
        MatchingInfoDto matchedDto = null;
        for(MatchingInfoDto matchingDto : searchQueue){
            if(isMatched(matchingDto, dto)){
                // 매칭 대상을 발견했다면 삭제 대상에 포함
                log.info("매칭 대상 발견 : {} - {}", dto.getMemberId(), matchingDto.getMemberId());
                matchedDto = matchingDto;
                break;
            }
        }
        // 순회 종료
        // 매칭되었다면 대상의 id를 저장한 후 큐에서 해당 대상을 삭제, 매칭이 성사된다
        if(matchedDto != null){
            searchQueue.remove(matchedDto);
            return true;
        }

        // [2] 매칭 큐 삽입
        // 매칭되지 않았다면 매칭 큐에 삽입
        BlockingQueue<MatchingInfoDto> putQueue;
        if(dto.getMemberType().equals("reader")){
            putQueue = readerMatchingQueue;
        } else{
            putQueue = seekerMatchingQueue;
        }
        MatchingInfoDto putDto = MatchingInfoDto.builder()
                .keyword(dto.getKeyword())
                .roomStyle(dto.getRoomStyle())
                .matchedTime(LocalDateTime.now())
                .memberType(dto.getMemberType())
                .memberId(dto.getMemberId())
                .build();
        try {
            putQueue.put(putDto);
        } catch (InterruptedException e) {
            // todo : 매칭 interrupted되면 오류 출력시키기
        }
        return false; // 바로 매칭되지 않았으므로 false를 반환

    }
    

    // 매칭 성립 조건 : keyword, roomStyle이 동일하며, memberType는 매칭 요청 대상자와 반대여야 한다
    private boolean isMatched(MatchingInfoDto matchingDto, MatchingStartRequestDto dto){
        return matchingDto.getKeyword().equals(dto.getKeyword())
                && matchingDto.getRoomStyle().equals(dto.getRoomStyle());
    }

}
