package com.ssafy.tarotbom.domain.report.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportCreateReqDto {
    private long reporterId;
    private long reportedId;
    private long roomId;
    private String content;
    private String status;
    private String reportType;
}
