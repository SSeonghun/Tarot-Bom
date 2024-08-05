package com.ssafy.tarotbom.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteReaderRequestDto {
    private long readerId;
    private long seekerId;
}
