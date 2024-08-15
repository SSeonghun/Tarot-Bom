package com.ssafy.tarotbom.domain.notification.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class NotificationUpdateResponseDto {
    private long noId;
    private boolean read;
    private boolean valid;
}
