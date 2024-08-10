package com.ssafy.tarotbom.domain.report.repository;

import com.ssafy.tarotbom.domain.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface ReportRepository extends JpaRepository<Report, Long> {
}
