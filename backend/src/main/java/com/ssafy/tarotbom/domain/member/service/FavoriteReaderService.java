package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.request.FavoriteReaderRequestDto;
import com.ssafy.tarotbom.domain.member.dto.response.FavoriteReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface FavoriteReaderService {


    void addFavoriteReader(FavoriteReaderRequestDto favoriteReaderRequestDto);

    public List<ReaderListResponseDto> searchFavoriteReader(HttpServletRequest request);

    void deleteFavoriteReader(HttpServletRequest request, long readerId);
}
