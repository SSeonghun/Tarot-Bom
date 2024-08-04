package com.ssafy.tarotbom.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class RedisTool {
    private final RedisTemplate<String, Object> redisTemplate;

    public void setValues(String key, String data){
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(key, data);
    }
    public void setValues(String key, String data, Duration duration){
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(key, data, duration);
    }

    @Transactional(readOnly = true)
    public String getValues(String key){
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        if (values.get(key) == null) {
            return "false";
        }
        return (String) values.get(key);
    }

    // 레디스 키 삭제
    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }

    public boolean checkExistsValue(String value){
        return !value.equals("false");
    }
}
