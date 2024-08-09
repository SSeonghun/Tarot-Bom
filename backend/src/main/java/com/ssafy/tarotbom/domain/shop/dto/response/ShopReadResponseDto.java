package com.ssafy.tarotbom.domain.shop.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShopReadResponseDto {
    private long shopId;
    private long readerId;
    private String shopName;
    private String address;
    private String phone;
    private double longitude;
    private double latitude;
}
