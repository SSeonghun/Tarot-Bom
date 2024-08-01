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
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "M001", "이메일이 존재하지 않습니다."),
    MEMBER_DUPLICATED(HttpStatus.CONFLICT, "M002", "이미 존재하는 회원입니다."),
    MEMBER_DIFF_PASSWORD(HttpStatus.BAD_REQUEST, "M003", "비밀번호가 일치하지 않습니다."),
    MEMBER_INVALID_CODE(HttpStatus.BAD_REQUEST, "M004", "유효하지 않은 인증번호입니다."),
    MEMBER_INVALID_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "M005", "Runtime : 이메일 전송에 실패하였습니다.")
    ;
    // ==== 에러 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
