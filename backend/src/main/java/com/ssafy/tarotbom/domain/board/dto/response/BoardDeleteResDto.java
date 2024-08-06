package com.ssafy.tarotbom.domain.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class BoardDeleteResDto {
    private long BoardId;
}
