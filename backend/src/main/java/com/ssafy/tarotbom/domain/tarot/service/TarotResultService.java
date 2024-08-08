package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.TarotResultCardDto;
import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultSaveResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.util.List;

public interface TarotResultService {

    public TarotResultSaveResponseDto saveTarotResult(TarotResultSaveRequestDto dto);
    public TarotResultGetResponseDto getTarotResult(long resultId, HttpServletRequest request);
    public List<TarotResultGetResponseDto> getAllTarotResultsBySeekerId(long userId);
    public List<TarotResultGetResponseDto> getAllTarotResultsBySeekerId(long userId, int limit);

    List<TarotResultGetResponseDto> getAllTarotResultsByReaderId(long memberId);
    List<TarotResultGetResponseDto> getAllTarotResultsByReaderId(long memberId, int limit);

}
