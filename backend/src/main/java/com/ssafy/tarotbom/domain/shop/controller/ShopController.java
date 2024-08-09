package com.ssafy.tarotbom.domain.shop.controller;

import com.ssafy.tarotbom.domain.shop.dto.request.ShopAddRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.request.ShopUpdateRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopReadResponseDto;
import com.ssafy.tarotbom.domain.shop.service.ShopService;
import com.ssafy.tarotbom.global.result.ResultCode;
import com.ssafy.tarotbom.global.result.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/shop")
public class ShopController {
    private final ShopService shopService;
    // todo : 타로점 등록, 상세 조회, 수정, 삭제 만들기
    @PostMapping
    public ResponseEntity<ResultResponse> saveShop(@RequestBody ShopAddRequestDto shopAddRequestDto, HttpServletRequest request) {
        shopService.addShop(shopAddRequestDto, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SHOP_ADDED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/{shopId}")
    public ResponseEntity<ResultResponse> readShop(@PathVariable Long shopId) {
        ShopReadResponseDto shopReadResponseDto = shopService.readShop(shopId);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SHOP_GET_OK, shopReadResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PatchMapping("/{shopId}")
    public ResponseEntity<ResultResponse> updateShop(@PathVariable Long shopId, @RequestBody ShopUpdateRequestDto shopUpdateRequestDto, HttpServletRequest request) {
        shopService.updateShop(shopUpdateRequestDto, shopId, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SHOP_UPDATED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/{shopId}")
    public ResponseEntity<ResultResponse> deleteShop(@PathVariable Long shopId, HttpServletRequest request) {
        shopService.deleteShop(shopId, request);
        ResultResponse resultResponse = ResultResponse.of(ResultCode.SHOP_DELETED);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
