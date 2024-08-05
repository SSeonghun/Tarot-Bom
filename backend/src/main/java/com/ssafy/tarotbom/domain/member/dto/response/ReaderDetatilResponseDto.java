package com.ssafy.tarotbom.domain.member.dto.response;

import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReaderDetatilResponseDto {
    private long memberId;
    private String name;
    private String keyword;
    private String intro;
    private double rating;
    private String grade;
    private int price;

    // 기존 리더 리스트DTO에 추가로 더 반환
    private int allConsertings;
    private int allReaservations;
    private int afterReader;

    private List<ReviewReader> reviews;

    // todo: 추가로 오프라인 지도 데이터

}
