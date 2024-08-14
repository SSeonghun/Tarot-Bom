package com.ssafy.tarotbom.domain.report.dto.response;

import com.ssafy.tarotbom.domain.report.dto.ReportResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportListResponseDto {
    private List<ReportResponseDto> ReportListResponseDto;
}
