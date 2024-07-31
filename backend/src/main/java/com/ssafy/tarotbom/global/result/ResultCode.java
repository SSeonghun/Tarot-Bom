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
    ROOM_ENTERED(HttpStatus.OK, "R002", "방에 입장했습니다.")
    ;

    // ==== 응답 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
