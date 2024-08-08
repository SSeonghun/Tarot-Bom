package com.ssafy.tarotbom.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ResultCode {

    // 기본형
    COMMON_OK(HttpStatus.OK, "C001", "요청을 처리했습니다."),

    // Room
    ROOM_OPENED(HttpStatus.CREATED, "R001", "방을 개설했습니다."),
    ROOM_ENTERED(HttpStatus.OK, "R002", "방에 입장했습니다."),

    // Member
    LOGIN_OK(HttpStatus.OK, "M200", "로그인 했습니다."),
    SIGNUP_OK(HttpStatus.CREATED, "M201", "회원가입에 성공했습니다."),
    EMAIL_SEND_OK(HttpStatus.ACCEPTED, "M202", "이메일 전송에 성공했습니다."),
    VALIDATION_NUMBER_OK(HttpStatus.OK, "M004", "인증번호로 인증이 완료되었습니다."),
    READER_JOIN_OK(HttpStatus.CREATED, "M005", "리더 프로필을 만들었습니다."),
    CHANGE_READER_SEEKER_OK(HttpStatus.OK, "M006", "리더/시커 전환이 완료되었습니다."),
    LOGOUT_OK(HttpStatus.OK , "M007", "로그아웃 했습니다."),
    MEMBER_UPDATED(HttpStatus.OK, "M008", "기본 프로필 정보를 수정했습니다."),

    // Reader
    SEARCH_ALL_READER(HttpStatus.OK, "E001", "전체 리더를 조회했습니다."),
    SEARCH_READER_DETAIL(HttpStatus.OK, "E002", "리더 정보 조회에 성공했습니다."),
    SEARCH_TOP_READER(HttpStatus.OK, "E003", "탑 리더 정보 조회에 성공했습니다."),
    READER_UPDATED(HttpStatus.OK, "E004", "리더 프로필 정보를 수정했습니다."),

    // Favorite Reader
    FAVORITE_READER_ADD(HttpStatus.CREATED, "F001", "리더를 찜했습니다."),
    SEARCH_ALL_FAVORITE_READER(HttpStatus.OK, "F002", "찜한 리더 리스트를 불러왔습니다."),
    DELELTE_FAVORITE_READER(HttpStatus.OK, "F003", "리더 찜을 삭제했습니다."),

    // Mypage
    SEARCH_SEEKER_MYPAGE(HttpStatus.OK, "Y001", "시커 마이페이지를 조회합니다."),
    SEARCH_READER_MYPAGE(HttpStatus.OK, "Y002", "리더 마이페이지 조회합니다."),

    // Reservation
    RESERVATION_ADDED(HttpStatus.CREATED, "S001", "예약을 등록했습니다."),

    // Review
    REVIEW_ADDED(HttpStatus.CREATED, "V001", "리뷰를 작성했습니다."),
    REVIEW_LOADED(HttpStatus.OK, "V002", "리뷰를 불러왔습니다."),

    // Tarot
    TAROT_CARD_INFO_FOUND(HttpStatus.OK, "T001", "카드를 조회했습니다."),
    TAROT_CARD_RESULT_SAVED(HttpStatus.CREATED, "T002", "타로 결과를 저장했습니다."),
    TAROT_CARD_RESULT_FOUND(HttpStatus.OK, "T003", "타로 결과를 조회했습니다."),

    // Board
    BOARD_WRITE_OK(HttpStatus.CREATED, "B001", "게시글 작성 성공"),
    BOARD_GET_OK(HttpStatus.OK,  "B002", "게시글 조회 성공"),
    BOARD_UPDATE_OK(HttpStatus.OK, "B003", "게시글 수정 성공"),
    BOARD_DELETE_OK(HttpStatus.OK, "B004", "게시글 삭제 성공"),

    // Comment
    COMMENT_CREATE_OK(HttpStatus.CREATED, "C001", "댓글 작성 성공" ),
    COMMENT_UPDATE_OK(HttpStatus.OK, "C002", "댓글 수정 성공"),
    COMMENT_DELETE_OK(HttpStatus.OK, "C003", "댓글 삭제 성공")
    ;

    // ==== 응답 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
