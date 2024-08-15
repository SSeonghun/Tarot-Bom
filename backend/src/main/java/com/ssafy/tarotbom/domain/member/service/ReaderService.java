package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.response.ReaderDetailResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.TopReaderResponseDto;

import java.util.List;

public interface ReaderService {
    List<ReaderListResponseDto> searchAllReader();
    ReaderDetailResponseDto searchReaderDetail(long readerId);
    List<TopReaderResponseDto> searchTopReader();
}
