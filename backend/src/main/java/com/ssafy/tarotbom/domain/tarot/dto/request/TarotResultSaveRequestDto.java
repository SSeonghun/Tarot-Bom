package com.ssafy.tarotbom.domain.tarot.dto.request;

import com.ssafy.tarotbom.domain.tarot.dto.TarotResultCardDto;
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

    @Override
    public String toString() {
        return "TarotResultSaveRequestDto{" +
                "readerId=" + readerId +
                ", seekerId=" + seekerId +
                ", date=" + date +
                ", keyword='" + keyword + '\'' +
                ", memo='" + memo + '\'' +
                ", summary='" + summary + '\'' +
                ", music='" + music + '\'' +
                ", roomId=" + roomId +
                ", cards=" + cards +
                '}';
    }
}
