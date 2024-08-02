package com.ssafy.tarotbom.domain.member.dto.response;

import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SeekerMypageResponseDto {
    /////// 1.기본정보
    private String name; // 닉네임
    private String email; // 이메일
    private boolean isReader; // 리더프로필이 있는지 없는지
    private List<Reservation> reservationList; // 예약 내역

    //////최근 타로 내역
//    private

    //todo: 카테고리별 최대 퍼센트, 카테고리
    //private int bestPercent; // 카테고리별 최대 퍼센트
    //private String bestCategory; // 제일 많은 카테고리
    // + 카테고리별 수치도 넘겨줘야 할듯

    //todo: 찜리스트
    /////////
    // 찜리스트 영역
    ////////




}
