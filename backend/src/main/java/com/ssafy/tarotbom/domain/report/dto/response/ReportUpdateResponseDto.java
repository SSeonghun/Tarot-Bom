package com.ssafy.tarotbom.domain.report.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReportUpdateResponseDto {
    private long reportId;
    private long reporterId;
    private long reportedId;
    private Long roomId;
    private String content;
    private String status;
    private String reportType;
}
