package com.ssafy.tarotbom.global.error;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
    @Override
    public String toString() {
        return errorCode.getCode()+" : "+errorCode.getMessage();
    }
}
