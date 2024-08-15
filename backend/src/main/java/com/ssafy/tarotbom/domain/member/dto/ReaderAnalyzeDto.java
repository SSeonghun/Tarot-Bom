package com.ssafy.tarotbom.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReaderAnalyzeDto {
    private Map<String, Integer> categories;
}
