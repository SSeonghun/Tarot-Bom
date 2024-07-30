package com.ssafy.tarotbom.global.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class BasicMessageDto {

    private String message;

    public BasicMessageDto(String message) {
        this.message = message;
    }
}
