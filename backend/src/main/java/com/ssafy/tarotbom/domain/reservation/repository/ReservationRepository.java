package com.ssafy.tarotbom.domain.reservation.repository;

import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    public Reservation findByReservationId(long reservationId);
    public <S extends Reservation> S save(S res);
    List<Reservation> findAllByReaderId(long readerId);
    List<Reservation> findAllBySeekerId(long readerId);
}
