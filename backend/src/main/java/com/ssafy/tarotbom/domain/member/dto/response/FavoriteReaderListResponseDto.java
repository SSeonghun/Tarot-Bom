package com.ssafy.tarotbom.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteReaderListResponseDto {
    // 리더 정보
    List<ReaderListResponseDto> readerListResponseDtos;

}
