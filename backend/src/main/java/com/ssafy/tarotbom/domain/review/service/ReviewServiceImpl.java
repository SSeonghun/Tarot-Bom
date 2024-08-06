package com.ssafy.tarotbom.domain.review.service;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.review.dto.ReviewReaderDto;
import com.ssafy.tarotbom.domain.review.dto.request.ReviewAddRequestDto;
import com.ssafy.tarotbom.domain.review.dto.response.ReviewResponseDto;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import com.ssafy.tarotbom.domain.review.repository.ReviewReaderRepository;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultRepository;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewReaderRepository reviewReaderRepository;
    private final CookieUtil cookieUtil;
    private final MemberRepository memberRepository;
    private final TarotResultRepository tarotResultRepository;
    private final ReaderRepository readerRepository;

    /**
     * 특정 회원의 모든 리뷰를 조회합니다.
     *
     * @param memberId 회원 ID
     * @return 리뷰 응답 DTO
     */
    public ReviewResponseDto getAllReviews(long memberId) {

        Optional<Member> reader = memberRepository.findMemberByMemberId(memberId);

        List<ReviewReader> reviewReaders = reviewReaderRepository.findByReader(reader);

//        TarotResult tarotResult = tarotResultRepository.findByResultId();

        // ReviewReader를 ReviewReaderDto로 변환
        List<ReviewReaderDto> reviewReaderDtos = reviewReaders.stream()
                .map(reviewReader -> ReviewReaderDto.builder()
                        .reviewReaderId(reviewReader.getReviewReaderId())
                        .seekerId(reviewReader.getSeeker().getMemberId())
                        .readerId(reviewReader.getReader().getMemberId())
                        .resultId(reviewReader.getResult().getResultId())
                        .rating(reviewReader.getRating())
                        .content(reviewReader.getContent())
                        .createTime(reviewReader.getCreateTime())
                        .updateTime(reviewReader.getUpdateTime())
                        .build())
                .collect(Collectors.toList());

        return ReviewResponseDto.builder()
                .reviewReaders(reviewReaderDtos)
                .build();
    }

    @Override
    public void addReview(HttpServletRequest request, ReviewAddRequestDto reviewAddRequestDto) {

        long seekerId = cookieUtil.getUserId(request);

        Optional<Member> reader = memberRepository.findMemberByMemberId(reviewAddRequestDto.getReaderId());
        Optional<Member> member = memberRepository.findMemberByMemberId(seekerId);
        TarotResult result = tarotResultRepository.findByResultId(reviewAddRequestDto.getResultId());

        Optional<Member> optReader = Optional.ofNullable(readerRepository.findById(reviewAddRequestDto.getReaderId()).getMember());

        List<ReviewReader> reviewReaders = reviewReaderRepository.findByReader(optReader);

        //리뷰 내역 조회후 평균
        // 처음 등록되는 거면

        double rating = 0;

        // 처음 등록
        if(reviewReaders.size() == 0) {
            rating = reviewAddRequestDto.getRating();
        } else { // 등록 되어있다면 평균을 다시 계산
            double totalRating = optReader.get().getReader().getRating() * reviewReaders.size();
            totalRating += reviewAddRequestDto.getRating();
            rating = totalRating / (reviewReaders.size() + 1);
        }
        // todo: rating int -> double
        ReviewReader reviewReader = ReviewReader
                .builder()
                .reader(reader.get())
                .seeker(member.get())
                .rating((int) rating)
                .content(reviewAddRequestDto.getContent())
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .result(result)
                .build();

        reviewReaderRepository.save(reviewReader);

    }
}