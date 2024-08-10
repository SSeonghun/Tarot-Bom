package com.ssafy.tarotbom.domain.report.repository;

import com.ssafy.tarotbom.domain.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReportRepository extends JpaRepository<Report, Long> {
    public <S extends Report> S save(S entity);
    public Report findByReportId(Long reportId);
    public int deleteByReportId(Long reportId);
}
