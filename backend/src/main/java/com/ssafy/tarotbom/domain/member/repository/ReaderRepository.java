package com.ssafy.tarotbom.domain.member.repository;

import com.ssafy.tarotbom.domain.member.entity.Reader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReaderRepository extends JpaRepository<Reader, Long> {
    Reader findById(long id);

    @Query("SELECT r FROM Reader r JOIN FETCH r.member m JOIN FETCH r.keyword k JOIN FETCH r.grade g")
    List<Reader> findAllWithMemberKeywordAndGrade();
}
