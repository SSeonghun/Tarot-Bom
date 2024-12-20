package com.ssafy.tarotbom.domain.review.repository;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewReaderRepository extends JpaRepository<ReviewReader, Long> {
    List<ReviewReader> findByReader(Optional<Member> reader);
    List<ReviewReader> findBySeeker(Optional<Member> seeker);
    int countByReaderId(long readerId);
    boolean existsByReaderIdAndResultId(long readerId, long resultId);
}
