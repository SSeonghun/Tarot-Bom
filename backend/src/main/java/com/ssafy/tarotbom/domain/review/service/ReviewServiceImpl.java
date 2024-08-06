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
import jakarta.transaction.Transactional;
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
                        .seekerId(reviewReader.getSeekerId())
                        .readerId(reviewReader.getReaderId())
                        .resultId(reviewReader.getResultId())
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
    @Transactional
    public void addReview(HttpServletRequest request, ReviewAddRequestDto reviewAddRequestDto) {

        long seekerId = cookieUtil.getUserId(request);

        // 해당 reader의 rating을 갱신한다
        Reader reader = readerRepository.findByMemberId(reviewAddRequestDto.getReaderId());
        double readerRating = reader.getRating();
        int reviewCount = reviewReaderRepository.countByReaderId(reader.getMemberId());
        readerRating = (readerRating*reviewCount+reviewAddRequestDto.getRating())/(reviewCount+1);
        reader = reader.toBuilder().rating(readerRating).build();
        readerRepository.save(reader);

        ReviewReader reviewReader = ReviewReader
                .builder()
                .readerId(reviewAddRequestDto.getReaderId())
                .seekerId(seekerId)
                .rating(reviewAddRequestDto.getRating())
                .content(reviewAddRequestDto.getContent())
                .resultId(reviewAddRequestDto.getResultId())
                .build();

        reviewReaderRepository.save(reviewReader);

    }
}
