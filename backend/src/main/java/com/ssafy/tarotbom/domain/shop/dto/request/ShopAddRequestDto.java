package com.ssafy.tarotbom.domain.shop.dto.request;

import lombok.Getter;

@Getter
public class ShopAddRequestDto {
    private String shopName;
    private String address;
    private String phone;
    private double longitude;
    private double latitude;
}
