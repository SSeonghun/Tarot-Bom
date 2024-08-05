package com.ssafy.tarotbom.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SeekerAnalyzeDto {
    private Map<String, Integer> categories;
}
