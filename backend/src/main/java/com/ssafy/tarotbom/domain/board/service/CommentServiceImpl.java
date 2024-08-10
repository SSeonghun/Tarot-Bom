package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.CommentCreateReqDto;
import com.ssafy.tarotbom.domain.board.dto.request.CommentUpdateReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentCreateResDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentDeleteResDto;
import com.ssafy.tarotbom.domain.board.dto.response.CommentUpdateResDto;
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
    public CommentCreateResDto createComment(long boardId, CommentCreateReqDto reqDto) {

        // 요청한 회원이 존재하지 않는경우
        Member member = memberRepository.findMemberByMemberId(reqDto.getMemberId()).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 댓글 생성하기
        Comment comment = Comment.builder()
                .boardId(reqDto.getBoardId())
                .writerId(member.getMemberId())
                .content(reqDto.getContent())
                .build();

        // 게시글을 찾아서 댓글 + 1 해주기
        // repository에 해당 게시글 없는 경으 예외 발생
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

        // 게시글(+1) 저장, 댓글 저장
        boardRepository.save(updateBoard);
        commentRepository.save(comment);

        // 댓글 아이디와 정보 반환
        return CommentCreateResDto.builder()
                .commentId(comment.getCommentId())
                .boardId(comment.getBoardId())
                .content(comment.getContent())
                .createTime(comment.getCreateTime())
                .build();
    }

    @Override
    public CommentUpdateResDto updateComment(long boardId, CommentUpdateReqDto reqDto) {

        // 수정하는 사람의 아이디가 없는 경우 예외
        Member member = memberRepository.findMemberByMemberId(reqDto.getMemberId()).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 게시글이 없는 경우 예외
        Board board = boardRepository.findBoardByBoardId(boardId).orElseThrow(
                () -> new BusinessException(ErrorCode.BOARD_EMPTY)
        );


        // 수정을 요청한 댓글을 찾을 수 없는 경우 예외
        Comment comment = commentRepository.findById(reqDto.getCommentId()).orElseThrow(
                () -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND)
        );

        // 댓글 수정 권한이 없는 경우 예외
        if(comment.getWriterId() != member.getMemberId()){
            throw new BusinessException(ErrorCode.COMMENT_NOT_YOUR_COMMENT);
        }

        // 댓글 수정하기
        Comment updateComment = Comment.builder()
                .commentId(reqDto.getCommentId())
                .boardId(reqDto.getBoardId())
                .writerId(reqDto.getMemberId())
                .content(reqDto.getContent())
                .createTime(comment.getCreateTime())
                .build();

        // 수정한 댓글 저장
        commentRepository.save(updateComment);

        // 결과 반환 : 댓글Id, 게시판Id, 멤버Id, 내용
        return CommentUpdateResDto.builder()
                .commentId(updateComment.getCommentId())
                .boardId(updateComment.getBoardId())
                .memberId(updateComment.getWriter().getMemberId())
                .content(updateComment.getContent())
                .build();
    }

    public CommentDeleteResDto deleteComment(long boardId, long commentId) {
        // 게시글이 없는 경우 예외
        Board board = boardRepository.findBoardByBoardId(boardId).orElseThrow(
                () -> new BusinessException(ErrorCode.BOARD_EMPTY)
        );

        // 댓글 삭제
        commentRepository.deleteById(commentId);

        return CommentDeleteResDto.builder()
                .commentId(commentId)
                .build();
    }

}
