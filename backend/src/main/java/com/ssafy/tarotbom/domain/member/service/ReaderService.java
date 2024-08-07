package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.request.UpdateReaderRequestDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderDetatilResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.TopReaderResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ReaderService {
    List<ReaderListResponseDto> searchAllReader();
    ReaderDetatilResponseDto searchReaderDetail(long readerId);
    List<TopReaderResponseDto> searchTopReader();
}
