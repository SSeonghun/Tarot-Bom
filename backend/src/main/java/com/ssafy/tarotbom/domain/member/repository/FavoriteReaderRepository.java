package com.ssafy.tarotbom.domain.member.repository;

import com.ssafy.tarotbom.domain.member.entity.FavoriteReader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteReaderRepository extends JpaRepository<FavoriteReader, Long> {
    List<FavoriteReader> findBySeekerId(Long seekerId);
}
