package com.ssafy.tarotbom.global.socket;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SocketResponse {
    private final String code;
    private final String message;
    private final Object data;

    public static SocketResponse of(SocketCode socketCode, Object data) {
        return SocketResponse.builder()
                .code(socketCode.getCode())
                .message(socketCode.getMessage())
                .data(data)
                .build();
    }

    public static SocketResponse of(SocketCode socketCode) {
        return SocketResponse.builder()
                .code(socketCode.getCode())
                .message(socketCode.getMessage())
                .build();
    }
}
