package com.ssafy.tarotbom.domain.shop.service;

import com.ssafy.tarotbom.domain.shop.dto.request.ShopAddRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.request.ShopUpdateRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopReadResponseDto;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopUpdateRespondDto;
import jakarta.servlet.http.HttpServletRequest;

public interface ShopService {
    void addShop(ShopAddRequestDto shopAddRequestDto, HttpServletRequest request);
    ShopReadResponseDto readShop(Long shopId);
    ShopUpdateRespondDto updateShop(ShopUpdateRequestDto shopUpdateRequestDto, long shopId, HttpServletRequest request);
    void deleteShop(Long shopId, HttpServletRequest request);
}
