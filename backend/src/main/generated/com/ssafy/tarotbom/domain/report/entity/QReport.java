package com.ssafy.tarotbom.domain.report.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = 1194592862L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReport report = new QReport("report");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final com.ssafy.tarotbom.domain.member.entity.QMember reported;

    public final com.ssafy.tarotbom.domain.member.entity.QMember reporter;

    public final NumberPath<Long> reportId = createNumber("reportId", Long.class);

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail reportType;

    public final com.ssafy.tarotbom.domain.room.entity.QRoom room;

    public final com.ssafy.tarotbom.global.code.entity.QCodeDetail status;

    public QReport(String variable) {
        this(Report.class, forVariable(variable), INITS);
    }

    public QReport(Path<? extends Report> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReport(PathMetadata metadata, PathInits inits) {
        this(Report.class, metadata, inits);
    }

    public QReport(Class<? extends Report> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reported = inits.isInitialized("reported") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reported"), inits.get("reported")) : null;
        this.reporter = inits.isInitialized("reporter") ? new com.ssafy.tarotbom.domain.member.entity.QMember(forProperty("reporter"), inits.get("reporter")) : null;
        this.reportType = inits.isInitialized("reportType") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("reportType")) : null;
        this.room = inits.isInitialized("room") ? new com.ssafy.tarotbom.domain.room.entity.QRoom(forProperty("room"), inits.get("room")) : null;
        this.status = inits.isInitialized("status") ? new com.ssafy.tarotbom.global.code.entity.QCodeDetail(forProperty("status")) : null;
    }

}

