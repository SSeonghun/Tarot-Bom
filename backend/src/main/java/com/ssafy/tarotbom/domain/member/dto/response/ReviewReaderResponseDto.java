package com.ssafy.tarotbom.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Builder
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ReviewReaderResponseDto {
//                "reviewReaderId": 4,
//                        "seekerId": 11,
//                        "readerId": 11,
//                        "resultId": 3,
//                        "rating": 5,
//                        "content": "Excellent reading12!",
//                        "createTime": "2024-08-04T18:02:07",
//                        "updateTime": "2024-08-04T18:02:07"

    private String reviewReaderId;
    private String seekerId;
    private String readerId;
    private int rating;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
