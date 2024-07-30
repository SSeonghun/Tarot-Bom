package com.ssafy.tarotbom.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 기본형
    COMMON_NOT_FOUND(HttpStatus.NOT_FOUND, "C404", "요청한 리소스를 찾을 수 없습니다.");

    // ==== 에러 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
