package com.ssafy.tarotbom.domain.shop.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShopUpdateRequestDto {
    private long shopId;
    private String shopName;
    private String address;
    private String phone;
    private double longitude;
    private double latitude;
}
