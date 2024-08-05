package com.ssafy.tarotbom.domain.board.service;

import com.ssafy.tarotbom.domain.board.dto.request.BoardWriteReqDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardListResDto;
import com.ssafy.tarotbom.domain.board.dto.response.BoardWriteResDto;
import com.ssafy.tarotbom.domain.board.entity.Board;
import com.ssafy.tarotbom.domain.board.repository.BoardRepository;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;

    // 게시판 생성 시 : memberId, 카테고리(공지, 카드정보 등), 제목, 내용
    // 게시판 생성 성공하면 결과로 해당 정보 알려줌.
    @Override
    public BoardWriteResDto createBoard(@Valid BoardWriteReqDto boardWriteReqDto) {

        Board board = Board.builder()
                .memberId(boardWriteReqDto.getMemberId())
                .category(boardWriteReqDto.getCategory())
                .title(boardWriteReqDto.getTitle())
                .content(boardWriteReqDto.getContent())
                .build();

        Board saveBoard = boardRepository.save(board);

        return BoardWriteResDto.builder()
                .memberId(saveBoard.getMemberId())
                .title(saveBoard.getTitle())
                .content(saveBoard.getContent())
                .createTime(saveBoard.getCreateTime())
                .category(saveBoard.getCategory())
                .commentCnt(saveBoard.getCommentCnt())
                .likelyCnt(saveBoard.getLikelyCnt())
                .build();
    }

    // 전체 게시글 리스트 보내기(게시판아이디, 멤버id, 작성자, 카테고리, 제목, 내용,
    @Override
    public List<BoardListResDto> getListBoard() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream().map(board -> BoardListResDto.builder()
                        .boardId(board.getBoardId())
                        .memberId(board.getMemberId())
                        .nickname(board.getMember().getNickname())
                        .category(board.getCategory())
                        .title(board.getTitle())
                        .createdTime(board.getCreateTime())
                        .updateTime(board.getUpdateTime())
                        .commentCnt(board.getCommentCnt())
                        .likelyCnt(board.getLikelyCnt())
                        .build())
                .collect(Collectors.toList());
    }
}
