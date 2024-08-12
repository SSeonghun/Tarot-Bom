package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.tarot.dto.request.TarotSummaryRenewRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotSummaryGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.entity.TarotSummary;
import com.ssafy.tarotbom.domain.tarot.repository.TarotSummaryRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TarotSummaryServiceImpl implements TarotSummaryService {
    private final CookieUtil cookieUtil;
    private final TarotSummaryRepository tarotSummaryRepository;
    private final MemberRepository memberRepository;

    @Override
    public void renewTarotSummary(TarotSummaryRenewRequestDto tarotSummaryRenewRequestDto, HttpServletRequest request) {
        log.info("renewing tarot summary...");
        long memberId = cookieUtil.getUserId(request);
        Member member = memberRepository.findMemberByMemberId(memberId).orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
        TarotSummary tarotSummary = TarotSummary.builder()
                .member(member)
                .cardId(tarotSummaryRenewRequestDto.getCardId())
                .content(tarotSummaryRenewRequestDto.getContent())
                .build();
        tarotSummaryRepository.save(tarotSummary);
    }

    @Override
    public TarotSummaryGetResponseDto getTarotSummary(HttpServletRequest request) {
        log.info("get tarot summary...");
        long memberId = cookieUtil.getUserId(request);
        if(!memberRepository.existsById(memberId)) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }
        TarotSummary tarotSummary = tarotSummaryRepository.findByMemberId(memberId);
        return TarotSummaryGetResponseDto.builder()
                .cardId(tarotSummary.getCardId())
                .cardName(tarotSummary.getCard().getCardName())
                .description(tarotSummary.getCard().getDescription())
                .imageUrl(tarotSummary.getCard().getImageUrl())
                .content(tarotSummary.getContent())
                .createTime(tarotSummary.getCreateTime())
                .build();
    }
}
