package com.ssafy.tarotbom.domain.member.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public TokenService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // 리프레시 토큰을 Redis에 저장하고 유효시간을 설정
    public void saveRefreshToken(String memberId, String refreshToken, long duration, TimeUnit unit) {
        redisTemplate.opsForValue().set("refreshToken:" + memberId, refreshToken, duration, unit);
    }

    // 리프레시 토큰을 Redis에서 가져옴
    public String getRefreshToken(long memberId) {
        return (String) redisTemplate.opsForValue().get("refreshToken:" + memberId);
    }

    // 리프레시 토큰을 Redis에서 삭제
    public void deleteRefreshToken(String memberId) {
        redisTemplate.delete("refreshToken:" + memberId);
    }
}

