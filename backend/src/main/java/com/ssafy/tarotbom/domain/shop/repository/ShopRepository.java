package com.ssafy.tarotbom.domain.shop.repository;

import com.ssafy.tarotbom.domain.shop.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    public <S extends Shop> S save(S shop);
    boolean existsByReaderId(Long readerId);
    public Shop findByShopId(Long shopId);
    public void deleteByShopId(Long shopId);
}
