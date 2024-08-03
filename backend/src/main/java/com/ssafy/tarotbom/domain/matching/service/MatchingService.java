package com.ssafy.tarotbom.domain.matching.service;

public interface MatchingService {
    // 매칭 신청, 끝 여부 기록
    public void setMatchingStatusStart(long memberId, String memberType);
    public void setMatchingStatusEnd(long memberId, String memberType);

    // 매칭 시작
    public void startMatching(long memberId, String memberType);
    // 매칭 확인
    public void confirmMatching(long memberId, String memberType, long matchId);

}
