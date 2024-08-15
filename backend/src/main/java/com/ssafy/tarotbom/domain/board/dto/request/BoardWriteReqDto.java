package com.ssafy.tarotbom.domain.board.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BoardWriteReqDto {

    @NotNull
    private long memberId;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private String category;

}
