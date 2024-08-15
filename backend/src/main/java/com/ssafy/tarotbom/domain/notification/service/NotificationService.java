package com.ssafy.tarotbom.domain.notification.service;

import com.ssafy.tarotbom.domain.notification.dto.request.NotificationSaveRequestDto;
import com.ssafy.tarotbom.domain.notification.dto.request.NotificationUpdateRequestDto;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationGetResponseDto;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationUpdateResponseDto;

import java.util.List;

public interface NotificationService {
    NotificationGetResponseDto saveNotification(NotificationSaveRequestDto notificationSaveRequestDto);
    List<NotificationGetResponseDto> getNotifications(long memberId);
    NotificationUpdateResponseDto updateNotification(NotificationUpdateRequestDto notificationUpdateRequestDto);
}
