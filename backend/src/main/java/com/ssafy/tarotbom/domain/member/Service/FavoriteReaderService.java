package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.request.FavoriteReaderRequestDto;
import com.ssafy.tarotbom.domain.member.dto.response.FavoriteReaderListResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface FavoriteReaderService {


    void addFavoriteReader(FavoriteReaderRequestDto favoriteReaderRequestDto);

    FavoriteReaderListResponseDto searchFavoriteReader(HttpServletRequest request);
}
