package com.ssafy.tarotbom.domain.member.dto;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class ReaderAbstractReviewDto {
    private long reviewReaderId;
    private long seekerId;
    private String seekerName;
    private String seekerProfileUrl;
    private long readerId;
    private int rating;
    private String content;
}
