package com.ssafy.tarotbom.domain.matching.service;

import com.ssafy.tarotbom.domain.matching.dto.request.MatchingStartRequestDto;

public interface MatchingService {
    // 매칭 신청, 끝 여부 기록
    public boolean setMatchingStatusStart(long memberId);
    public boolean setMatchingStatusEnd(long memberId);

    // 매칭 시작
    public boolean startMatching(MatchingStartRequestDto dto);

}
