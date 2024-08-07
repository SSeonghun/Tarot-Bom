package com.ssafy.tarotbom.domain.member.repository;

import com.ssafy.tarotbom.domain.member.entity.FavoriteReader;
import com.ssafy.tarotbom.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteReaderRepository extends JpaRepository<FavoriteReader, Long> {
    List<FavoriteReader> findBySeeker(Member seeker);
    FavoriteReader findBySeekerIdAndReaderId(Long seekerId, Long readerId);
    Optional<FavoriteReader> findBySeeker_MemberIdAndReader_MemberId(Long seekerId, Long readerId);
    int deleteByReaderId(Long readerId);
}
