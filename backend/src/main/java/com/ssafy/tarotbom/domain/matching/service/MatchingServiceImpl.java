package com.ssafy.tarotbom.domain.matching.service;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
public class MatchingServiceImpl implements MatchingService {

    private List<MatchingInfoDto> readerMatchingQueue;
    private List<MatchingInfoDto> seekerMatchingQueue;

    // List 할당을 위한 생성자 수동 작성
    public MatchingServiceImpl() {
        readerMatchingQueue = new LinkedList<>();
        seekerMatchingQueue = new LinkedList<>();
    }

    @Override
    public void setMatchingStatusStart(long memberId, String memberType) {

    }

    @Override
    public void setMatchingStatusEnd(long memberId, String memberType) {

    }

    @Override
    public void startMatching(long memberId, String memberType) {

    }

    @Override
    public void confirmMatching(long memberId, String memberType, long matchId) {

    }
}
