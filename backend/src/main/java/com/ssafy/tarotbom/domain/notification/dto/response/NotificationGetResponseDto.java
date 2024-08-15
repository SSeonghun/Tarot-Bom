package com.ssafy.tarotbom.domain.notification.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class NotificationGetResponseDto {
    private long noId;
    private long memberId;
    private String noType;
    private String content;
    private boolean read;
    private boolean valid;
    private LocalDateTime createTime;
}
