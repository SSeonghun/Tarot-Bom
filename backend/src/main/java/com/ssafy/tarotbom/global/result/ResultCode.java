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
    LOGIN_OK(HttpStatus.OK, "M200", "로그인 성공"),
    SIGNUP_OK(HttpStatus.CREATED, "M201", "회원가입 성공"),
    EMAIL_SEND_OK(HttpStatus.ACCEPTED, "M202", "이메일 전송"),
    VALIDATION_NUMBER_OK(HttpStatus.OK, "M004", "인증번호 인증 성공"),

    // Tarot
    TAROT_CARD_INFO_FOUND(HttpStatus.OK, "T001", "카드 조회 성공"),

    // Board
    WRITE_OK(HttpStatus.CREATED, "B001", "게시글 작성 성공")
    ;
    // ==== 응답 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
