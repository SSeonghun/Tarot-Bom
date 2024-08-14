package com.ssafy.tarotbom.domain.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponseDto {
    private long reportId;
    private String content;
    private LocalDateTime createTime;
    private String reportType;
    private long readerId;
    private long reporterId;
    private String status;
}
