package com.ssafy.tarotbom.global.error;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex){
        log.error(ex.toString());
        ErrorCode errorCode = ex.getErrorCode();
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    protected ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex){
        log.error(ex.toString());
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.DTO_NOT_VALID);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<ErrorResponse> handleNotNullException(ConstraintViolationException ex){
        log.error(ex.toString());
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.DTO_NOT_NULL);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse> handleNotValidException(MethodArgumentNotValidException ex){
        log.error(ex.toString());
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.DTO_NOT_VALID);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception ex){
//        log.error(ex.toString());
        ex.printStackTrace();
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.COMMON_ETC);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }
}
