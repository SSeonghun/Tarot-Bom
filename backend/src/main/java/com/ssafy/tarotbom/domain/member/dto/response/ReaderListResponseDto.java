package com.ssafy.tarotbom.domain.member.dto.response;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReaderListResponseDto {
    private long memberId;
    private String name;
    private CodeDetail memberType;
    private CodeDetail keyword;
    private String intro;
    private double rating;
    private CodeDetail grade;
    private int price;

}
