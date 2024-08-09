package com.ssafy.tarotbom.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReaderDto {
    private long reviewReaderId;
    private long seekerId;
    private String seekerName;
    private String seekerProfileUrl;
    private long readerId;
    private long resultId;
    private int rating;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
