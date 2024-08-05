package com.ssafy.tarotbom.domain.review.service;

import com.ssafy.tarotbom.domain.review.dto.request.ReviewAddRequestDto;
import com.ssafy.tarotbom.domain.review.dto.response.ReviewResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;

public interface ReviewService {

    ReviewResponseDto getAllReviews(long memberId);

    void addReview(HttpServletRequest request, ReviewAddRequestDto reviewAddRequestDto);
}
