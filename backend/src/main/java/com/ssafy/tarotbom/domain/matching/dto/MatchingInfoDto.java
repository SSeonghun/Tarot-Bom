package com.ssafy.tarotbom.domain.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class MatchingInfoDto {
    private String keyword;
    private String roomStyle;
    private LocalDateTime matchedTime;
    private String memberType;
    private long memberId;
    private boolean inConfirm;

    public void switchConfirm() {
        inConfirm = !inConfirm;
    }

    @Override
    public boolean equals(Object o) {
        if(o instanceof MatchingInfoDto canDto) {
            // inConfirm 외의 모든 값을 확인한다
            return canDto.getKeyword().equals(this.getKeyword())
                    && canDto.getRoomStyle().equals(this.getRoomStyle())
                    && canDto.getMatchedTime().equals(this.getMatchedTime())
                    && canDto.getMemberType().equals(this.getMemberType())
                    && (canDto.getMemberId() == this.getMemberId());
        } else {
            return false;
        }
    }
}
