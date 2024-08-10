package com.ssafy.tarotbom.domain.report.controller;

import com.ssafy.tarotbom.domain.report.dto.request.ReportCreateReqDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportUpdateReqDto;
import com.ssafy.tarotbom.domain.report.dto.response.ReportUpdateResponseDto;
import com.ssafy.tarotbom.domain.report.service.ReportService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<ResultResponse> createReport(@RequestBody ReportCreateReqDto reqDto, HttpServletRequest request){
        reportService.createReport(reqDto, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.DECLARATION_CREATE_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PutMapping("/{reportId}")
    public ResponseEntity<ResultResponse> updateReport(@PathVariable long reportId, @RequestBody ReportUpdateReqDto reqDto, HttpServletRequest request){
        ReportUpdateResponseDto reportUpdateResponseDto = reportService.updateReport(reportId, reqDto, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.DECLARATION_UPDATE_OK, reportUpdateResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/{reportId}")
    public ResponseEntity<ResultResponse> deleteReport(@PathVariable long reportId, HttpServletRequest request){
        reportService.deleteReport(reportId, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.DECLARATION_DELETE_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


}
