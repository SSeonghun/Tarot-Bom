package com.ssafy.tarotbom.domain.tarot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Builder
@Slf4j
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TarotResultSaveResponseDto {
    private long result_id;
}
