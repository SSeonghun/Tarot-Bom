package com.ssafy.tarotbom.domain.report.service;

import com.ssafy.tarotbom.domain.report.dto.request.ReportCreateReqDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportUpdateReqDto;
import com.ssafy.tarotbom.domain.report.dto.response.ReportUpdateResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface ReportService {
    void createReport(ReportCreateReqDto reqDto, HttpServletRequest request);
    ReportUpdateResponseDto updateReport(long reportId, ReportUpdateReqDto reqDto, HttpServletRequest request);
    void deleteReport(long reportId, HttpServletRequest request);
}
