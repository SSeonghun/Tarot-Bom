package com.ssafy.tarotbom.domain.openvidu.service;

import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenviduServiceImpl implements OpenviduService {

    @Value("${livekit.api.key}")
    private String LIVEKIT_API_KEY;

    @Value("${livekit.api.secret}")
    private String LIVEKIT_API_SECRET;


    /**
     * <pre>
     * public String getToken(long userId, long roomId)
     * 입력받은 userId를 participantName으로, roomId를 roomName으로 삼아 token을 발급합니다.
     * </pre>
     */
    @Override
    public String getToken(long userId, long roomId) {
        AccessToken accessToken = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
        accessToken.setName(Long.toString(userId));
        accessToken.setIdentity(Long.toString(userId));
        accessToken.addGrants(new RoomJoin(true), new RoomName(Long.toString(roomId)));
        return accessToken.toJwt();
    }
}
