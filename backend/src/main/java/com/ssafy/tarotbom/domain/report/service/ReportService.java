package com.ssafy.tarotbom.domain.report.service;

import com.ssafy.tarotbom.domain.report.dto.request.ReportCreateReqDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportUpdateReqDto;

public interface ReportService {
    void createReport(ReportCreateReqDto reqDto);
    void updateReport(ReportUpdateReqDto reqDto);
}
