package com.ssafy.tarotbom.domain.tarot.dto.response;

import com.ssafy.tarotbom.domain.tarot.dto.TarotResultCardDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class TarotResultGetResponseDto {
    private long resultId;
    private long readerId;
    private long seekerId;
    private LocalDateTime date;
    private String keyword;
    private String memo;
    private String summary;
    private String music;
    private List<TarotResultCardResponseDto> cards;
}
