package com.ssafy.tarotbom.domain.report.service;


import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.report.dto.request.ReportCreateReqDto;
import com.ssafy.tarotbom.domain.report.dto.request.ReportUpdateReqDto;
import com.ssafy.tarotbom.domain.report.entity.Report;
import com.ssafy.tarotbom.domain.report.repository.ReportRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;

    @Override
    public void createReport(ReportCreateReqDto reqDto) {
        Report report = Report.builder()
                .reporterId(reqDto.getReporterId())
                .reportedId(reqDto.getReportedId())
                .roomId(reqDto.getRoomId())
                .content(reqDto.getContent())
                .statusType(reqDto.getStatus())
                .reportCategory(reqDto.getReportType())
                .build();
        try {
            reportRepository.save(report);
        } catch (Exception e) {
            log.error(e.toString());
        }

    }



    @Override
    public void updateReport(long reportId, ReportUpdateReqDto reqDto) {
        Member member = memberRepository.findMemberByMemberId(reqDto.getMemberId()).orElseThrow(
                () -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND)
        );

        if(!member.getMemberTypeId().equals("M00")){
            throw new BusinessException(ErrorCode.MEMBER_NOT_ADMIN);
        }
        Report report = reportRepository.findById(reportId).orElseThrow(
                () -> new BusinessException(ErrorCode.REPORT_NOT_FOUND)
        );

        Report updateReport = Report.builder()
                .reportId(reportId)
                .reporterId(report.getReporterId())
                .reportedId(report.getReportedId())
                .statusType(reqDto.getStatus())
                .reportCategory(report.getReportCategory())
                .roomId(report.getRoomId())
                .content(report.getContent())
                .build();

        reportRepository.save(updateReport);
    }

    public void deleteReport(long reportId) {
        try {
            reportRepository.deleteById(reportId);
        }catch (Exception e){
            log.error(e.toString());
        }
    }

}
