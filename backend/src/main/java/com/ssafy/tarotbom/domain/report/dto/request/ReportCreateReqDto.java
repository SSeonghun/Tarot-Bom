package com.ssafy.tarotbom.domain.report.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportCreateReqDto {
    private long reportedId;
    private Long roomId;
    private String content;
    private String reportType;

    @Override
    public String toString() {
        return "ReportCreateReqDto{" +
                "reportedId=" + reportedId +
                ", roomId=" + roomId +
                ", content='" + content + '\'' +
                ", reportType='" + reportType + '\'' +
                '}';
    }
}
