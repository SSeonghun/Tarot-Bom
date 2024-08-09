package com.ssafy.tarotbom.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 기본형
    COMMON_ETC(HttpStatus.INTERNAL_SERVER_ERROR, "C001", "서버에 오류가 발생했습니다."),
    COMMON_NOT_FOUND(HttpStatus.NOT_FOUND, "C002", "요청한 리소스를 찾을 수 없습니다."),

    // Room
    ROOM_RESERVED_ALREADY_EXISTS(HttpStatus.CONFLICT, "R001", "이미 방이 생성된 예약입니다."),
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "R002", "방을 찾을 수 없습니다."),
    ROOM_NOT_YOUR_ROOM(HttpStatus.FORBIDDEN, "R003", "방에 접근할 권한이 없습니다."),

    // Member
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "M001", "존재하지 않는 회원입니다."),
    MEMBER_DUPLICATED(HttpStatus.CONFLICT, "M002", "이미 존재하는 회원입니다."),
    MEMBER_DIFF_PASSWORD(HttpStatus.BAD_REQUEST, "M003", "비밀번호가 일치하지 않습니다."),
    MEMBER_INVALID_CODE(HttpStatus.BAD_REQUEST, "M004", "유효하지 않은 인증번호입니다."),
    MEMBER_INVALID_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "M005", "Runtime : 이메일 전송에 실패하였습니다."),
    MEMBER_COOKIE_NOT_FOUND(HttpStatus.NOT_FOUND, "M006", "쿠키를 찾지 못했습니다"),
    MEMBER_YOU_ARE_NOT_READER(HttpStatus.FORBIDDEN, "M008", "리더가 아닌 사용자입니다."),
    MEMBER_PROFILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "M009", "프로필 이미지 업로드에 실패했습니다."),
    MEMBER_ALREADY_READER(HttpStatus.CONFLICT, "M010", "이미 리더 프로필이 있는 회원입니다."),
    MEMBER_NOT_ADMIN(HttpStatus.FORBIDDEN, "M011", "관리자가 아닌 사용자 입니다."),

    // Favorite Reader
    FAVORITE_DUPLICATED(HttpStatus.CONFLICT, "F001", "이미 찜한 리더 입니다."),
    FAVORITE_NOT_FOUND(HttpStatus.NOT_FOUND, "M007", "이미 없는 찜 목록입니다."),

    // Reservation
    RESERVATION_NOT_FOUND(HttpStatus.NOT_FOUND, "S001", "예약을 찾을 수 없습니다."),

    // Review
    REVIEW_ALREADY_EXISTS(HttpStatus.CONFLICT, "V001", "이미 작성된 리뷰가 있습니다."),

    // Tarot
    TAROT_CARD_INFO_NOT_FOUND(HttpStatus.NOT_FOUND, "T001", "해당하는 타로 카드를 찾을 수 없습니다."),
    TAROT_RESULT_NOT_FOUND(HttpStatus.NOT_FOUND, "T002", "해당하는 타로 결과를 찾을 수 없습니다."),
    TAROT_RESULT_NOT_YOUR_RESULT(HttpStatus.FORBIDDEN, "T003", "타로 결과를 조회할 권한이 없습니다."),

    // Board
    BOARD_EMPTY(HttpStatus.NOT_FOUND, "B001", "게시글이 존재하지 않습니다."),
    BOARD_NOT_FOUND(HttpStatus.NOT_FOUND, "B002", "해당하는 게시글을 찾을 수 없습니다."),
    BOARD_NOT_YOUR_BOARD(HttpStatus.FORBIDDEN, "B003", "게시글을 수정할 권한이 없습니다."),
    BOARD_DATA_INTEGRITY_VIOLATION(HttpStatus.CONFLICT, "B004", "무결성 제한"),

    // Comment
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "C001", "해당하는 댓글을 찾을 수 없습니다."),
    COMMENT_NOT_YOUR_COMMENT(HttpStatus.FORBIDDEN, "C002", "댓글을 수정할 권한이 없습니다."),

    // Dto
    DTO_NOT_NULL(HttpStatus.BAD_REQUEST, "D001", "값이 Null일 수 없습니다."),
    DTO_NOT_VALID(HttpStatus.BAD_REQUEST, "D002", "유효하지 않은 값입니다."),

    // Email
    EMAIL_SEND_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "E001", "이메일 전송에 실패했습니다.")


    ;
    // ==== 에러 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
