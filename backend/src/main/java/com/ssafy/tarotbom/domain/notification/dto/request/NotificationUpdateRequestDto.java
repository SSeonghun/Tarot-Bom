package com.ssafy.tarotbom.domain.notification.dto.request;

import lombok.Getter;

@Getter
public class NotificationUpdateRequestDto {
    private long noId;
    private long memberId;
    private boolean read;
    private boolean valid;
}
