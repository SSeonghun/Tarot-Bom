package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import jakarta.transaction.Transactional;

public interface TarotResultService {

    public void saveTarotResult(TarotResultSaveRequestDto dto);
    public TarotResultGetResponseDto getTarotResult(long resultId, long userId);
}
