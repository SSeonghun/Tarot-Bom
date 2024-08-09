package com.ssafy.tarotbom.domain.shop.service;

import com.ssafy.tarotbom.domain.shop.dto.request.ShopAddRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.request.ShopUpdateRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopReadResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface ShopService {
    void addShop(ShopAddRequestDto shopAddRequestDto, HttpServletRequest request);
    ShopReadResponseDto readShop(Long shopId);
    void updateShop(ShopUpdateRequestDto shopUpdateRequestDto, long shopId, HttpServletRequest request);
    void deleteShop(Long shopId, HttpServletRequest request);
}
