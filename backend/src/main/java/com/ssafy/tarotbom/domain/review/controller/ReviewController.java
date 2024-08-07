package com.ssafy.tarotbom.domain.review.controller;

import com.ssafy.tarotbom.domain.review.dto.request.ReviewAddRequestDto;
import com.ssafy.tarotbom.domain.review.dto.response.ReviewResponseDto;
import com.ssafy.tarotbom.domain.review.service.ReviewService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;
    /**
     * 해당 리더 전체 리뷰 조회
     * @param readerId
     * @return
     */
    @GetMapping("/{readerId}")
    public ResponseEntity<?> getReviewE(@Valid @PathVariable long readerId) {

        ReviewResponseDto reviewResponseDto = reviewService.getAllReviews(readerId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.REVIEW_LOADED, reviewResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PutMapping("/add")
    public ResponseEntity<?> addReview (@RequestBody ReviewAddRequestDto reviewAddRequestDto, HttpServletRequest request) {
        reviewService.addReview(request, reviewAddRequestDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.REVIEW_ADDED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
