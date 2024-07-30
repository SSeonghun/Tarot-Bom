package com.ssafy.tarotbom.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 기본형
    COMMON_NOT_FOUND(HttpStatus.NOT_FOUND, "C404", "요청한 리소스를 찾을 수 없습니다."),
    // Room
    ROOM_RESERVED_ALREADY_EXISTS(HttpStatus.CONFLICT, "R409", "이미 방이 생성된 예약입니다."),
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "R404", "방을 찾을 수 없습니다."),
    ROOM_NOT_YOUR_ROOM(HttpStatus.FORBIDDEN, "R403", "방에 접근할 권한이 없습니다.")
    ;

    // ==== 에러 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
