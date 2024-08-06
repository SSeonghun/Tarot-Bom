package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.response.ReaderDetatilResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;

import java.util.List;

public interface ReaderService {
    List<ReaderListResponseDto> searchAllReader();
    ReaderDetatilResponseDto searchReaderDetail(long readerId);
}
