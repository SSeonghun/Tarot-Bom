package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.request.TarotSummaryRenewRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotSummaryGetResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface TarotSummaryService {
    public void renewTarotSummary(TarotSummaryRenewRequestDto tarotSummaryRenewRequestDto, HttpServletRequest request);
    public TarotSummaryGetResponseDto getTarotSummary(HttpServletRequest request);
}
