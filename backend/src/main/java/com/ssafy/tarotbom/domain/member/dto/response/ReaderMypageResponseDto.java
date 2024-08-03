package com.ssafy.tarotbom.domain.member.dto.response;

import com.ssafy.tarotbom.domain.reservation.dto.response.ReadReservationResponseDto;
import com.ssafy.tarotbom.domain.tarot.dto.response.TarotResultGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReaderMypageResponseDto {
    private String name;
    private String email;

    // 예약 내역
    private List<ReadReservationResponseDto> readReservationResponseDtoList;

    // 타로 내역
    private List<TarotResultGetResponseDto> tarotResultGetResponseDtos;

    // todo : 리뷰 내역
    // todo : 결제 내역
}