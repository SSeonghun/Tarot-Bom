package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.TarotResultCardDto;
import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultSaveResponseDto;
import com.ssafy.tarotbom.domain.tarot.entity.TarotCard;
import com.ssafy.tarotbom.domain.tarot.entity.TarotDirection;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResultCard;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultCardRepository;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultQueryRepository;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TarotResultServiceImpl implements TarotResultService {

    private final TarotResultRepository tarotResultRepository;
    private final TarotResultCardRepository tarotResultCardRepository;
    private final TarotResultQueryRepository tarotResultQueryRepository;
    private final CookieUtil cookieUtil;
    /** <pre>
     * public void saveTarotResult(TarotResultSaveRequestDto dto)
     * dto로 입력된 정보를 기반으로 타로 결과를 저장합니다.
     * 타로 결과를 저장하면서, 타로 결과에 딸린 카드 결과 객체들도 같이 저장합니다.
     * </pre>
     * */
    @Override
    @Transactional
    public TarotResultSaveResponseDto saveTarotResult(TarotResultSaveRequestDto dto) {
        // 배열 구성 완료
        // 먼저 save할 TarotResult entity를 구성한다
        TarotResult tarotResult = TarotResult.builder()
                .readerId(dto.getReaderId())
                .seekerId(dto.getSeekerId())
                .roomId(dto.getRoomId())
                .keywords(dto.getKeyword())
                .date(dto.getDate())
                .memo(dto.getMemo())
                .summary(dto.getSummary())
                .music(dto.getMusic())
                .build();

        TarotResult savedResult = tarotResultRepository.save(tarotResult);
        List<TarotResultCardDto> cardDtos = dto.getCards();
        // 이후 dto의 list값을 기반으로 card를 구성한다
        List<TarotResultCard> cardList = new ArrayList<>();
        for (TarotResultCardDto cardDto : cardDtos) {
            TarotDirection dir;
            if(cardDto.getDirection().equals("reversed")){
                dir = TarotDirection.R;
            } else {
                dir = TarotDirection.U;
            }
            TarotResultCard tarotResultCard = TarotResultCard.builder()
                    .resultId(savedResult.getResultId())
                    .cardId(cardDto.getCardId())
                    .sequence(cardDto.getSequence())
                    .direction(dir)
                    .build();
            cardList.add(tarotResultCard);
        }
        // 삽입할 list 구성 종료
        // 값을 삽입한다.
        tarotResultCardRepository.saveAll(cardList);

        TarotResultSaveResponseDto tarotResultSaveResponseDto = TarotResultSaveResponseDto
                .builder()
                .result_id(savedResult.getResultId())
                .build();

        return null;
    }

    /** <pre>
     * public void getTarotResult(long resultId)
     * resultId를 기반으로 타로 결과를 반환합니다. 카드의 정보도 함께 반환합니다.
     * </pre>
     * */
    @Override
    @Transactional
    public TarotResultGetResponseDto getTarotResult(long resultId, HttpServletRequest request) {
        log.info("요청 받음 : getTarotResult");
        TarotResult tarotResult = tarotResultRepository.findById(resultId).orElse(null);
        long memberId = cookieUtil.getUserId(request);
        if(tarotResult == null) { // 검색 결과가 없다면 null을 반환
            throw new BusinessException(ErrorCode.TAROT_RESULT_NOT_FOUND);
        }
        log.info("seeker : {}, reader : {}", tarotResult.getReaderId(), tarotResult.getSeekerId());
        if(tarotResult.getReaderId() != memberId && tarotResult.getSeekerId() != memberId){
            throw new BusinessException(ErrorCode.TAROT_RESULT_NOT_YOUR_RESULT);
        }
        List<TarotResultCardDto> cards = new ArrayList<>();
        // 우선 카드 리스트 정보부터 채운다
        for(TarotResultCard c : tarotResult.getCardList()){
            TarotCard oneCard = c.getCard();
            String direction;
            // enum값을 응답에 맞도록 String으로 변경
            if(c.getDirection() == TarotDirection.R) {
                direction = "reversed";
            } else{
                direction = "upright";
            }
            cards.add(
                    TarotResultCardDto.builder()
                            .cardId(oneCard.getCardId())
                            .sequence(c.getSequence())
                            .direction(direction)
                            .build()
            );
        }
        return TarotResultGetResponseDto.builder()
                .readerId(tarotResult.getReaderId())
                .seekerId(tarotResult.getSeekerId())
                .date(tarotResult.getDate())
                .keyword(tarotResult.getKeywords())
                .memo(tarotResult.getMemo())
                .summary(tarotResult.getSummary())
                .music(tarotResult.getMusic())
                .cards(cards)
                .build();
    }

    /**
     * 특정 유저의 모든 타로 결과를 조회합니다.
     *
     * @param userId 유저 ID
     * @return 유저의 모든 타로 결과 리스트
     */
    @Transactional
    @Override
    public List<TarotResultGetResponseDto> getAllTarotResultsBySeekerId(long userId) {

        List<TarotResult> tarotResults = tarotResultRepository.findAllBySeekerId(userId);

        log.info("{}", tarotResults.size());

//        if (tarotResults.isEmpty()) {
//            throw new BusinessException(ErrorCode.TAROT_RESULT_NOT_FOUND);
//        }

        return tarotResults.stream()
                .map(result -> {
                    // 카드 리스트 정보 채우기
                    List<TarotResultCardDto> cards = new ArrayList<>();
                    for (TarotResultCard c : result.getCardList()) {
                        String direction = (c.getDirection() == TarotDirection.R) ? "reversed" : "upright";
                        cards.add(TarotResultCardDto.builder()
                                .cardId(c.getCard().getCardId())
                                .sequence(c.getSequence())
                                .direction(direction)
                                .build());
                    }

                    return TarotResultGetResponseDto.builder()
                            .readerId(result.getReaderId())
                            .seekerId(result.getSeekerId())
                            .date(result.getDate())
                            .keyword(result.getKeywords())
                            .memo(result.getMemo())
                            .summary(result.getSummary())
                            .music(result.getMusic())
                            .cards(cards)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<TarotResultGetResponseDto> getAllTarotResultsBySeekerId(long userId, int limit) {
        List<TarotResult> tarotResults = tarotResultQueryRepository.findAllBySeekerId(userId, limit);

        log.info("{}", tarotResults.size());

//        if (tarotResults.isEmpty()) {
//            throw new BusinessException(ErrorCode.TAROT_RESULT_NOT_FOUND);
//        }

        return tarotResults.stream()
                .map(result -> {
                    // 카드 리스트 정보 채우기
                    List<TarotResultCardDto> cards = new ArrayList<>();
                    for (TarotResultCard c : result.getCardList()) {
                        String direction = (c.getDirection() == TarotDirection.R) ? "reversed" : "upright";
                        cards.add(TarotResultCardDto.builder()
                                .cardId(c.getCard().getCardId())
                                .sequence(c.getSequence())
                                .direction(direction)
                                .build());
                    }

                    return TarotResultGetResponseDto.builder()
                            .readerId(result.getReaderId())
                            .seekerId(result.getSeekerId())
                            .date(result.getDate())
                            .keyword(result.getKeywords())
                            .memo(result.getMemo())
                            .summary(result.getSummary())
                            .music(result.getMusic())
                            .cards(cards)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<TarotResultGetResponseDto> getAllTarotResultsByReaderId(long memberId) {
        List<TarotResult> tarotResults = tarotResultRepository.findAllByReaderId(memberId);

        return tarotResults.stream()
                .map(result -> {
                    // 카드 리스트 정보 채우기
                    List<TarotResultCardDto> cards = new ArrayList<>();
                    for (TarotResultCard c : result.getCardList()) {
                        String direction = (c.getDirection() == TarotDirection.R) ? "reversed" : "upright";
                        cards.add(TarotResultCardDto.builder()
                                .cardId(c.getCard().getCardId())
                                .sequence(c.getSequence())
                                .direction(direction)
                                .build());
                    }

                    return TarotResultGetResponseDto.builder()
                            .readerId(result.getReaderId())
                            .seekerId(result.getSeekerId())
                            .date(result.getDate())
                            .keyword(result.getKeywords())
                            .memo(result.getMemo())
                            .summary(result.getSummary())
                            .music(result.getMusic())
                            .cards(cards)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<TarotResultGetResponseDto> getAllTarotResultsByReaderId(long memberId, int limit) {
        List<TarotResult> tarotResults = tarotResultQueryRepository.findAllByReaderId(memberId, limit);

        return tarotResults.stream()
                .map(result -> {
                    // 카드 리스트 정보 채우기
                    List<TarotResultCardDto> cards = new ArrayList<>();
                    for (TarotResultCard c : result.getCardList()) {
                        String direction = (c.getDirection() == TarotDirection.R) ? "reversed" : "upright";
                        cards.add(TarotResultCardDto.builder()
                                .cardId(c.getCard().getCardId())
                                .sequence(c.getSequence())
                                .direction(direction)
                                .build());
                    }

                    return TarotResultGetResponseDto.builder()
                            .readerId(result.getReaderId())
                            .seekerId(result.getSeekerId())
                            .date(result.getDate())
                            .keyword(result.getKeywords())
                            .memo(result.getMemo())
                            .summary(result.getSummary())
                            .music(result.getMusic())
                            .cards(cards)
                            .build();
                })
                .collect(Collectors.toList());
    }

}
