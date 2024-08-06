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

    // Reader
    SEARCH_ALL_READER(HttpStatus.OK, "E001", "전체 리더를 조회했습니다."),
    SEARCH_READER_DETAIL(HttpStatus.OK, "E002", "리더 상세 조회 성공"),

    // Favorite Reader
    FAVORITE_READER_ADD(HttpStatus.CREATED, "F001", "리더 찜하기 완료"),
    SEARCH_ALL_FAVORITE_READER(HttpStatus.OK, "F002", "찜한 리더 전체 조회"),
    DELELTE_FAVORITE_READER(HttpStatus.OK, "F003", "찜한 리더 삭제 성공"),

    // Mypage
    SEARCH_SEEKER_MYPAGE(HttpStatus.OK, "Y001", "시커 마이페이지 조회"),
    SEARCH_READER_MYPAGE(HttpStatus.OK, "Y002", "리더 마이페이지 조회"),



    // Tarot
    TAROT_CARD_INFO_FOUND(HttpStatus.OK, "T001", "카드 조회 성공"),
    TAROT_CARD_RESULT_SAVED(HttpStatus.CREATED, "T002", "타로 결과 저장 성공"),
    TAROT_CARD_RESULT_FOUND(HttpStatus.OK, "T003", "타로 결과 조회 성공"),


    ;
    // ==== 응답 코드 정의 종료 ====

    private final HttpStatus status;
    private final String code;
    private final String message;
}
