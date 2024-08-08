package com.ssafy.tarotbom.domain.member.dto.response;

import com.ssafy.tarotbom.domain.member.dto.ReaderAbstractReviewDto;
import com.ssafy.tarotbom.domain.member.dto.ReaderAnalyzeDto;
import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReaderMypageResponseDto {
    private String name;
    private String email;

    // 요약 관련
    private int totalConsulting;
    private ReaderAnalyzeDto categoryanalyze;
    private ReaderAnalyzeDto monthlyanalyze;
    // 예약 내역
    private List<ReadReservationResponseDto> readReservationResponseDtoList;

    // 타로 내역
    private List<TarotResultGetResponseDto> tarotResultGetResponseDtos;
<<<<<<< HEAD

    private List<ReviewReaderResponseDto> reviewReaderResponseDtos;
=======
    
    private List<ReaderAbstractReviewDto> reviewReaderResponseDtos;
>>>>>>> 2e7a8d7e4462f5365a62232a5b7399315e1b25e7
}
