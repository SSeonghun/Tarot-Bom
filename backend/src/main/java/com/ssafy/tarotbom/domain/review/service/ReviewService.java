package com.ssafy.tarotbom.domain.review.service;

import com.ssafy.tarotbom.domain.review.dto.request.ReviewAddRequestDto;
import com.ssafy.tarotbom.domain.review.dto.response.ReviewResponseDto;
import com.ssafy.tarotbom.domain.review.dto.response.ReviewResponseSeekerDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;

public interface ReviewService {

    ReviewResponseDto getAllReviews(long memberId);
    ReviewResponseSeekerDto getAllReviewsSeeker(long seekerId);

    void addReview(HttpServletRequest request, ReviewAddRequestDto reviewAddRequestDto);
}
