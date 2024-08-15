package com.ssafy.tarotbom.domain.review.dto.response;

import com.ssafy.tarotbom.domain.review.dto.ReviewReaderDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseSeekerDto {
    private List<ReviewReaderDto> reviewSeekers;
}
