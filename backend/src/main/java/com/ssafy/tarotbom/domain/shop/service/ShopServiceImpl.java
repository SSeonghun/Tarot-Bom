package com.ssafy.tarotbom.domain.shop.service;

import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.shop.dto.request.ShopAddRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.request.ShopUpdateRequestDto;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopReadResponseDto;
import com.ssafy.tarotbom.domain.shop.entity.Shop;
import com.ssafy.tarotbom.domain.shop.repository.ShopRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopServiceImpl implements ShopService {
    private final ShopRepository shopRepository;
    private final ReaderRepository readerRepository;
    private final CookieUtil cookieUtil;
    @Override
    public void addShop(ShopAddRequestDto shopAddRequestDto, HttpServletRequest request) {
        long readerId = cookieUtil.getUserId(request);
        // 저장하기 전, readerId의 유효성 확인
        if(!readerRepository.existsByMemberId(readerId)) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }
        // 이미 샵이 등록되어있는 리더라면 또 등록할 수 없다
        if(shopRepository.existsByReaderId(readerId)){
            throw new BusinessException(ErrorCode.SHOP_ALREADY_EXISTS);
        }
        Shop shop = Shop.builder()
                .readerId(readerId)
                .shopName(shopAddRequestDto.getShopName())
                .address(shopAddRequestDto.getAddress())
                .phone(shopAddRequestDto.getPhone())
                .longitude(shopAddRequestDto.getLongitude())
                .latitude(shopAddRequestDto.getLatitude())
                .build();
        shopRepository.save(shop);
    }

    @Override
    public ShopReadResponseDto readShop(Long shopId) {
        Shop shop = shopRepository.findByShopId(shopId);
        if(shop == null) {
            throw new BusinessException(ErrorCode.SHOP_NOT_FOUND);
        }
        ShopReadResponseDto shopReadResponseDto = ShopReadResponseDto.builder()
                .shopId(shop.getShopId())
                .readerId(shop.getReaderId())
                .shopName(shop.getShopName())
                .address(shop.getAddress())
                .phone(shop.getPhone())
                .longitude(shop.getLongitude())
                .latitude(shop.getLatitude())
                .build();
        return shopReadResponseDto;
    }

    @Override
    @Transactional
    public void updateShop(ShopUpdateRequestDto shopUpdateRequestDto, long shopId, HttpServletRequest request) {
        // update하려는 shop이 해당 리더의 것인지 확인
        long readerId = cookieUtil.getUserId(request);
        Shop shop = shopRepository.findByShopId(shopId);
        log.info("readerId : {}, shopId : {}", readerId, shopId);
        if(shop == null) {
            throw new BusinessException(ErrorCode.SHOP_NOT_FOUND);
        } else if(shop.getReaderId() != readerId) { // 본인 샵이 아니라면 수정 불가
            throw new BusinessException(ErrorCode.SHOP_NOT_YOUR_SHOP);
        }
        shopRepository.save(shop.toBuilder()
                .shopName(shopUpdateRequestDto.getShopName())
                .address(shopUpdateRequestDto.getAddress())
                .phone(shopUpdateRequestDto.getPhone())
                .longitude(shopUpdateRequestDto.getLongitude())
                .latitude(shopUpdateRequestDto.getLatitude())
                .build());
    }

    @Override
    @Transactional
    public void deleteShop(Long shopId, HttpServletRequest request) {
        // delete하려는 shop이 해당 리더의 것인지 확인
        long readerId = cookieUtil.getUserId(request);
        Shop shop = shopRepository.findByShopId(shopId);
        if(shop == null) {
            throw new BusinessException(ErrorCode.SHOP_NOT_FOUND);
        } if(shop.getReaderId() != readerId) {
            throw new BusinessException(ErrorCode.SHOP_NOT_YOUR_SHOP);
        }
        // 유효하다면 delete연산 시행
        shopRepository.deleteByShopId(shopId);
    }
}
