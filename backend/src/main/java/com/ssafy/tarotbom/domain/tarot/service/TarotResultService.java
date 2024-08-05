package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.TarotResultCardDto;
import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultSaveResponseDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface TarotResultService {

    public TarotResultSaveResponseDto saveTarotResult(TarotResultSaveRequestDto dto);
    public TarotResultGetResponseDto getTarotResult(long resultId, long userId);
    public List<TarotResultGetResponseDto> getAllTarotResultsBySeekerId(long userId);

    List<TarotResultGetResponseDto> getAllTarotResultsByReaderId(long memberId);
}
