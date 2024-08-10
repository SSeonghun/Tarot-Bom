package com.ssafy.tarotbom.domain.report.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportUpdateReqDto {
    private long memberId;
    private String status;

}
