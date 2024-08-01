package com.ssafy.tarotbom.domain.tarot.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class TarotResultSaveRequestDto {
    private long readerId;
    private long seekerId;
    private LocalDateTime date;
    private String keyword;
    private String memo;
    private String summary;
    private String music;
    private long roomId;
    private List<TarotResultCardDto> cards;

}
