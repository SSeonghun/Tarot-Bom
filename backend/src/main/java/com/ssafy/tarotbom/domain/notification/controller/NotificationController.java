package com.ssafy.tarotbom.domain.notification.controller;

import com.ssafy.tarotbom.domain.notification.dto.request.NotificationSaveRequestDto;
import com.ssafy.tarotbom.domain.notification.dto.request.NotificationUpdateRequestDto;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationGetResponseDto;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationUpdateResponseDto;
import com.ssafy.tarotbom.domain.notification.service.NotificationService;
import com.ssafy.tarotbom.global.socket.SocketCode;
import com.ssafy.tarotbom.global.socket.SocketResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import java.util.List;

@Slf4j
@Controller
@MessageMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final SimpMessageSendingOperations sendingOperation;

    @Value("${notification.notify.path}")
    private String notifyPath;

    @MessageMapping("/notify")
    public void saveNotificationBySystem(NotificationSaveRequestDto dto) {
        log.info("notify to member {} by system", dto.getMemberId());
        NotificationGetResponseDto responseDto = notificationService.saveNotification(dto);
        SocketResponse socketResponse = SocketResponse.of(SocketCode.NOTIFICATION_RENEWED, responseDto);
        sendingOperation.convertAndSend(notifyPath+dto.getMemberId(), socketResponse);
    }

    @MessageMapping("/notify/{senderId}")
    public void saveNotificationBySender(@DestinationVariable("senderId") long senderId, NotificationSaveRequestDto dto) {
        log.info("notify to member {} by sender {}", dto.getMemberId(), senderId);
        NotificationGetResponseDto responseDto = notificationService.saveNotification(dto);
        SocketResponse socketResponse = SocketResponse.of(SocketCode.NOTIFICATION_SAVED);
        sendingOperation.convertAndSend(notifyPath+senderId, socketResponse);
        // 이후 알람 대상자에게 알람을 전송한다
        socketResponse = SocketResponse.of(SocketCode.NOTIFICATION_RENEWED, responseDto);
        sendingOperation.convertAndSend(notifyPath+dto.getMemberId(), socketResponse);
    }

    @MessageMapping("/get/{memberId}")
    public void getNotification(@DestinationVariable("memberId") long memberId) {
        log.info("get all valid notification of member (num {})", memberId);
        List<NotificationGetResponseDto> responseList = notificationService.getNotifications(memberId);
        SocketResponse socketResponse = SocketResponse.of(SocketCode.NOTIFICATION_GET_OK, responseList);
        sendingOperation.convertAndSend(notifyPath+memberId, socketResponse);
    }

    @MessageMapping("/update")
    public void updateNotification(NotificationUpdateRequestDto dto) {
        log.info("update status of notification");
        NotificationUpdateResponseDto responseDto = notificationService.updateNotification(dto);
        if(responseDto == null) {
            log.error("notification not found");
            SocketResponse socketResponse = SocketResponse.of(SocketCode.NOTIFICATION_NOT_FOUND);
            sendingOperation.convertAndSend(notifyPath+dto.getMemberId(), socketResponse);
            return;
        }
        SocketResponse socketResponse = SocketResponse.of(SocketCode.NOTIFICATION_STATUS_UPDATE_OK, responseDto);
        sendingOperation.convertAndSend(notifyPath+dto.getMemberId(), socketResponse);
    }

}
