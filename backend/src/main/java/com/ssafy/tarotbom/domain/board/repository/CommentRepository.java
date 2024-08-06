package com.ssafy.tarotbom.domain.board.repository;

import com.ssafy.tarotbom.domain.board.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardId(long boardId);
    int countCommentsByBoardId(long boardId);
}
