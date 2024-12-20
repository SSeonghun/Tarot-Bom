package com.ssafy.tarotbom.domain.matching.service;

import com.ssafy.tarotbom.domain.matching.dto.MatchingInfoDto;

public interface MatchingService {
    // 매칭 신청, 끝 여부 기록
    public boolean setMatchingStatusStart(long memberId);
    public boolean setMatchingStatusEnd(long memberId);

    public MatchingInfoDto searchToMatching(MatchingInfoDto dto);
    public boolean offerToMatchingQueue(MatchingInfoDto dto);
    public void removeFromMatchingQueue(MatchingInfoDto ...dto);
    public boolean confirmMatching(MatchingInfoDto myDto, MatchingInfoDto candidateDto);

    public void setConfirmFalse(MatchingInfoDto dto);
    public long openMatchingRoom(MatchingInfoDto myDto, MatchingInfoDto candidateDto);

}
