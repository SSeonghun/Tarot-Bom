package com.ssafy.tarotbom.domain.notification.repository;

import com.ssafy.tarotbom.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    <S extends Notification> S save(S notification);
    Notification findByNoId(long noId);
}
