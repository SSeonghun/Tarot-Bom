package com.ssafy.tarotbom.global.socket;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SocketCode {

    // matching
    MATCHING_ALREADY_PROCESSING("M01", "이미 매칭 중입니다."),
    MATCHING_MATCHED("M02", "매칭되었습니다. 확인해주세요."),
    MATCHING_QUEUE_PUT("M03", "매칭 신청을 완료했습니다."),
    MATCHING_QUEUE_PUT_FAILED("M04", "매칭 신청에 실패했습니다. 다시 시도해주세요."),
    MATCHING_CONFIRMED("M05", "매칭 확인을 수령했습니다."),
    MATCHING_CANCELED("M06", "매칭을 취소했습니다."),
    MATCHING_CANDIDATE_CANCELED("M07", "상대방이 매칭을 취소했습니다. 다시 상대를 찾습니다."),
    MATCHING_ENTER_ROOM("M08", "매칭 확인이 완료되었습니다. 방에 입장합니다..."),

    // notification
    NOTIFICATION_SAVED("N01", "요청한 내용의 알람을 저장했습니다."),
    NOTIFICATION_RENEWED("N02", "새로운 알람이 도착했습니다."),
    NOTIFICATION_GET_OK("N03", "알람 리스트를 가져왔습니다."),
    NOTIFICATION_STATUS_UPDATE_OK("N04", "알람의 상태를 업데이트했습니다."),
    NOTIFICATION_NOT_FOUND("N05", "요청한 알람을 찾을 수 없습니다."),
    ;
    // ==== Socket 코드 정의 부분 종료 ====

    private final String code;
    private final String message;

}
