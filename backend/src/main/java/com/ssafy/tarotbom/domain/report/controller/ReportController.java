package com.ssafy.tarotbom.domain.report.controller;

import com.ssafy.tarotbom.domain.report.dto.request.ReportCreateReqDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportUpdateReqDto;
import com.ssafy.tarotbom.domain.report.service.ReportService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/declaration")
    public ResponseEntity<ResultResponse> createReport(@RequestBody ReportCreateReqDto reqDto){
        reportService.createReport(reqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.DECLARATION_CREATE_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PutMapping("/declaration/{reportId}")
    public ResponseEntity<ResultResponse> updateReport(@PathVariable long reportId, @RequestBody ReportUpdateReqDto reqDto){
        reportService.updateReport(reqDto);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.DECLARATION_UPDATE_OK);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }



}
