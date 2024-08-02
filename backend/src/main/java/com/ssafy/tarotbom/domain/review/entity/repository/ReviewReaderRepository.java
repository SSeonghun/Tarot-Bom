package com.ssafy.tarotbom.domain.review.entity.repository;

import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewReaderRepository extends JpaRepository<Reader, Long> {
    List<ReviewReader> findByMemberId(long readerId);
}
