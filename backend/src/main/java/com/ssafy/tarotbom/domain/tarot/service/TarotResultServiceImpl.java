package com.ssafy.tarotbom.domain.tarot.service;

import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultCardDto;
import com.ssafy.tarotbom.domain.tarot.dto.request.TarotResultSaveRequestDto;
import com.ssafy.tarotbom.domain.tarot.entity.TarotDirection;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResultCard;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultCardRepository;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TarotResultServiceImpl implements TarotResultService {

    private final TarotResultRepository tarotResultRepository;
    private final TarotResultCardRepository tarotResultCardRepository;

    /** <pre>
     * public void saveTarotResult(TarotResultSaveRequestDto dto)
     * dto로 입력된 정보를 기반으로 타로 결과를 저장합니다.
     * 타로 결과를 저장하면서, 타로 결과에 딸린 카드 결과 객체들도 같이 저장합니다.
     * </pre>
     * */
    @Override
    @Transactional
    public void saveTarotResult(TarotResultSaveRequestDto dto) {
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
    }
}
