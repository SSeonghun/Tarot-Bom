package com.ssafy.tarotbom.domain.member.repository;

import com.ssafy.tarotbom.domain.member.entity.Reader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReaderRepository extends JpaRepository<Reader, Long> {
    Reader findById(long id);
}
