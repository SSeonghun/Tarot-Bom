package com.ssafy.tarotbom.domain.room.repository;
import com.ssafy.tarotbom.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoomRepository extends JpaRepository<Room, Long> {
    public <S extends Room> S save(S room);
    public Room findByRoomId(Long roomId);
}
