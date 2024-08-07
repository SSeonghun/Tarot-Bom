package com.ssafy.tarotbom.domain.board.repository;

import com.ssafy.tarotbom.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findBoardByBoardId(long boardId);

}
