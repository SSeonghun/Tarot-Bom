package com.ssafy.tarotbom.domain.review.controller;

import com.ssafy.tarotbom.domain.review.dto.request.ReviewAddRequestDto;
import com.ssafy.tarotbom.domain.review.dto.response.ReviewResponseDto;
import com.ssafy.tarotbom.domain.review.service.ReviewService;
import com.ssafy.tarotbom.global.result.ResultCode;
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
    public ResponseEntity<?> getReview (@Valid @PathVariable long readerId) {

        ReviewResponseDto reviewResponseDto = reviewService.getAllReviews(readerId);

        return ResponseEntity.status(ResultCode.VALIDATION_NUMBER_OK.getStatus()).body(reviewResponseDto);
    }

    @PutMapping("/add")
    public ResponseEntity<?> addReview (@Valid HttpServletRequest request, @RequestBody ReviewAddRequestDto reviewAddRequestDto) {

        reviewService.addReview(request, reviewAddRequestDto);

        return null;
    }
}
