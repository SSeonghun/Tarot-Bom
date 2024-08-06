package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.request.FavoriteReaderRequestDto;
import com.ssafy.tarotbom.domain.member.dto.response.FavoriteReaderListResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface FavoriteReaderService {


    void addFavoriteReader(FavoriteReaderRequestDto favoriteReaderRequestDto);

    FavoriteReaderListResponseDto searchFavoriteReader(HttpServletRequest request);

    void deleteFavoriteReader(HttpServletRequest request, long readerId);
}
