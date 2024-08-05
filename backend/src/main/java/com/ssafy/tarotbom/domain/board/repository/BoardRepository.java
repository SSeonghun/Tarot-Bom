package com.ssafy.tarotbom.domain.board.repository;

import com.ssafy.tarotbom.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Board save(Board board);
    List<Board> findAll();
    Board findBoardByBoardId(long boardId);

}
