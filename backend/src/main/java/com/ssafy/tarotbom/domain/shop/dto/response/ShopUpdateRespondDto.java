package com.ssafy.tarotbom.domain.shop.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShopUpdateRespondDto {
    private long shopId;
    private String shopName;
    private String address;
    private String phone;
    private double longitude;
    private double latitude;
}
