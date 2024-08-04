package com.ssafy.tarotbom.domain.matching.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchingRedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public boolean setMatchingStatusStart(String key, long memberId){
        SetOperations<String, Object> sets = redisTemplate.opsForSet();
        log.info("setMatchingStatusStart:memberId:{} / key:{}",memberId, key);
        if(sets.isMember(key, memberId)){
            log.info("이미 매칭 중인 회원 : {}", memberId);
            return false;
        }
        sets.add(key, memberId);
        return true;
    }

    public boolean setMatchingStatusEnd(String key, long memberId){
        SetOperations<String, Object> sets = redisTemplate.opsForSet();
        if(!sets.isMember(key, memberId)){
            log.info("매칭 큐에 존재하지 않는 회원 : {}", memberId);
            return false;
        }
        sets.remove(key, memberId);
        return true;
    }
}
