package com.ssafy.tarotbom.domain.notification.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NotificationSaveRequestDto {
    private long memberId;
    private String noType;
    private String content;
}
