package com.ssafy.tarotbom.domain.notification.service;

import com.ssafy.tarotbom.domain.notification.dto.request.NotificationSaveRequestDto;
import com.ssafy.tarotbom.domain.notification.dto.request.NotificationUpdateRequestDto;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationGetResponseDto;
import com.ssafy.tarotbom.domain.notification.dto.response.NotificationUpdateResponseDto;
import com.ssafy.tarotbom.domain.notification.entity.Notification;
import com.ssafy.tarotbom.domain.notification.repository.NotificationQueryRepository;
import com.ssafy.tarotbom.domain.notification.repository.NotificationRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationQueryRepository notificationQueryRepository;

    /**
     * 새로운 알람을 저장한 후, 그 내용을 반환
     * */
    @Override
    public NotificationGetResponseDto saveNotification(NotificationSaveRequestDto dto) {
        Notification notification = Notification.builder()
                .memberId(dto.getMemberId())
                .noTypeCode(dto.getNoType())
                .content(dto.getContent())
                .isRead(false)
                .isValid(true)
                .build();
        Notification newNotification = notificationRepository.save(notification);
        return NotificationGetResponseDto.builder()
                .noId(newNotification.getNoId())
                .memberId(newNotification.getMemberId())
                .noType(newNotification.getNoTypeCode())
                .content(newNotification.getContent())
                .read(false)
                .valid(true)
                .build();
    }

    @Override
    public List<NotificationGetResponseDto> getNotifications(long memberId) {
        return notificationQueryRepository.findByMemberId(memberId);
    }

    @Override
    public NotificationUpdateResponseDto updateNotification(NotificationUpdateRequestDto dto) {
        Notification notification = notificationRepository.findByNoId(dto.getNoId());
        if(notification == null) {
            return null;
        }
        Notification newNotification = notification.toBuilder()
                .isRead(dto.isRead())
                .isValid(dto.isValid())
                .build();
        notificationRepository.save(newNotification);
        return NotificationUpdateResponseDto.builder()
                .noId(newNotification.getNoId())
                .read(newNotification.isRead())
                .valid(newNotification.isValid())
                .build();
    }
}
