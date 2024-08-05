package com.ssafy.tarotbom.domain.review.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewAddRequestDto {
    private long resultId;
    private long readerId;
    private int rating;
    private String content;
}
