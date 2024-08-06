package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.CommentCreateReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentCreateResDto;
import com.ssafy.tarotbom.domain.board.entity.Board;
import com.ssafy.tarotbom.domain.board.entity.Comment;
import com.ssafy.tarotbom.domain.board.repository.BoardRepository;
import com.ssafy.tarotbom.domain.board.repository.CommentRepository;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    @Transactional
    @Override
    public CommentCreateResDto commentCreate(long boardId, CommentCreateReqDto reqDto) {

        Member member = memberRepository.findMemberByMemberId(reqDto.getMemberId()).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        Comment comment = Comment.builder()
                .boardId(reqDto.getBoardId())
                .writer(member)
                .content(reqDto.getContent())
                .build();

        Board board = boardRepository.findBoardByBoardId(boardId).orElseThrow(
                () -> new BusinessException(ErrorCode.BOARD_EMPTY)
        );

        Board updateBoard = Board.builder()
                .boardId(board.getBoardId())
                .memberId(member.getMemberId())
                .title(board.getTitle())
                .content(board.getContent())
                .category(board.getCategory())
                .createTime(board.getCreateTime())
                .commentCnt(board.getCommentCnt() + 1)
                .likelyCnt(board.getLikelyCnt())
                .build();


        boardRepository.save(updateBoard);
        commentRepository.save(comment);

        return CommentCreateResDto.builder()
                .commentId(comment.getCommentId())
                .boardId(comment.getBoardId())
                .content(comment.getContent())
                .createTime(comment.getCreateTime())
                .updateTime(comment.getUpdateTime())
                .build();
    }


}
