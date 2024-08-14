package com.ssafy.tarotbom.domain.report.service;


import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.report.dto.ReportResponseDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportCreateReqDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportUpdateReqDto;
import com.ssafy.tarotbom.domain.report.dto.response.ReportUpdateResponseDto;
import com.ssafy.tarotbom.domain.report.entity.Report;
import com.ssafy.tarotbom.domain.report.repository.ReportRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;
    private final CookieUtil cookieUtil;

    @Override
    public void createReport(ReportCreateReqDto reqDto, HttpServletRequest request) {
        long reporterId = cookieUtil.getUserId(request);

        if(reporterId == reqDto.getReportedId()){ // 자기자신은 신고할 수 없음
            throw new BusinessException(ErrorCode.REPORT_REPORTER_ERROR);
        }
        if(!memberRepository.existsById(reqDto.getReportedId())){ // 존재하지 않는 신고대상을 신고할 수 없음
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }
        log.info("ReqDto : {}", reqDto.toString());
        Report report = Report.builder()
                .reporterId(reporterId)
                .reportedId(reqDto.getReportedId())
                .roomId(reqDto.getRoomId())
                .content(reqDto.getContent())
                .statusType("D00") // 신고 생성시 신고 접수 상태로 자동으로 들어간다
                .reportCategory(reqDto.getReportType())
                .build();
        reportRepository.save(report);
    }

    @Override
    @Transactional
    public ReportUpdateResponseDto updateReport(long reportId, ReportUpdateReqDto reqDto, HttpServletRequest request) {
        if(!cookieUtil.getMemberType(request).equals("M00")) { // 관리자가 아니면 수정할 수 없다
            throw new BusinessException(ErrorCode.MEMBER_NOT_ADMIN);
        }
        Report report = reportRepository.findByReportId(reportId);
        if(report == null) {
            throw new BusinessException(ErrorCode.REPORT_NOT_FOUND);
        }
        Report newReport = report.toBuilder().statusType(reqDto.getStatus()).build();
        reportRepository.save(newReport);
        // 변경했다면 respose를 준비
        return ReportUpdateResponseDto.builder()
                .reportId(newReport.getReportId())
                .reporterId(newReport.getReporterId())
                .reportedId(newReport.getReportedId())
                .roomId(newReport.getRoomId())
                .content(newReport.getContent())
                .status(newReport.getStatusType())
                .reportType(newReport.getReportCategory())
                .build();
    }

    @Override
    @Transactional
    public void deleteReport(long reportId, HttpServletRequest request) {
        if(!cookieUtil.getMemberType(request).equals("M00")) { // 관리자가 아니면 수정할 수 없다
            throw new BusinessException(ErrorCode.MEMBER_NOT_ADMIN);
        }
        if(reportRepository.deleteByReportId(reportId) == 0) {
            throw new BusinessException(ErrorCode.REPORT_NOT_FOUND);
        }
    }

    @Override
    public List<ReportResponseDto> getReport(HttpServletRequest request) {

        List<Report> list = reportRepository.findAll();

        // Report 리스트를 ReportResponseDto 리스트로 변환합니다.
        List<ReportResponseDto> dtoList = list.stream()
                .map(report -> ReportResponseDto.builder()
                        .reportId(report.getReportId()) // Report 클래스의 getId() 메서드를 사용한다고 가정
                        .content(report.getContent()) // Report 클래스의 getContent() 메서드를 사용한다고 가정
                        .createTime(report.getCreateTime()) // Report 클래스의 getCreateTime() 메서드를 사용한다고 가정
                        .reportType(report.getReportType().getCodeTypeId()) // Report 클래스의 getReportType() 메서드를 사용한다고 가정
                        .readerId(report.getReportedId()) // Report 클래스의 getReaderId() 메서드를 사용한다고 가정
                        .reporterId(report.getReporterId()) // Report 클래스의 getReporterId() 메서드를 사용한다고 가정
                        .status(report.getStatus().getCodeTypeId()) // Report 클래스의 getStatus() 메서드를 사용한다고 가정
                        .build()
                )
                .collect(Collectors.toList());

        // 변환된 DTO 리스트를 반환합니다.
        return dtoList;
    }
}
