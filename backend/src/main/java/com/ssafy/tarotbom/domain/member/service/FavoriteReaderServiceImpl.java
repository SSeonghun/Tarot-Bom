package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.request.FavoriteReaderRequestDto;
import com.ssafy.tarotbom.domain.member.dto.response.FavoriteReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.entity.FavoriteReader;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.repository.FavoriteReaderQueryRepository;
import com.ssafy.tarotbom.domain.member.repository.FavoriteReaderRepository;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteReaderServiceImpl implements FavoriteReaderService{

    private final ReaderRepository readerRepository;
    private final MemberRepository memberRepository;
    private final FavoriteReaderRepository favoriteReaderRepository;
    private final FavoriteReaderQueryRepository favoriteReaderQueryRepository;
    private final CookieUtil cookieUtil;

    /**
     * 찜리더 추가
     * @param favoriteReaderRequestDto
     */
    @Override
    public void addFavoriteReader(FavoriteReaderRequestDto favoriteReaderRequestDto) {
        long seekerId = favoriteReaderRequestDto.getSeekerId();
        long readerId = favoriteReaderRequestDto.getReaderId();

        if(favoriteReaderRepository.findBySeekerIdAndReaderId(seekerId, readerId) != null) {
            log.info("이미 찜한 조합 : {} -> {}", seekerId, readerId);
            throw new BusinessException(ErrorCode.FAVORITE_DUPLICATED);
        }
        // 이미 찜한 조합이 아니라면 새롭게 등록
        FavoriteReader favoriteReader = FavoriteReader
                .builder()
                .readerId(readerId)
                .seekerId(seekerId)
                .build();
        favoriteReaderRepository.save(favoriteReader);
    }

    /**
     * 찜 리더 리스트 검색
     * @param request
     * @return
     */
    @Override
    public List<ReaderListResponseDto> searchFavoriteReader(HttpServletRequest request) {

        long seekerId = cookieUtil.getUserId(request);
        Optional<Member> seeker = memberRepository.findMemberByMemberId(seekerId);
        if(seeker.isEmpty()){ // 만일 DB에 없는 시커라면 예외를 반환
            throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
        }
        // 해당 시커의 찜 목록
        List<FavoriteReader> favoriteReaders = favoriteReaderRepository.findBySeeker(seeker.get());

        log.info("Favorite readers count: {}", favoriteReaders.size());

        // favoriteReaderList 초기화
        List<ReaderListResponseDto> favoriteReaderList = new ArrayList<>();
        for (FavoriteReader favoriteReader : favoriteReaders) {
            Reader reader =  favoriteReader.getReader();
            if(reader == null) {
                // 연결이 끊어진 객체를 발견했다면 DB에서 삭제, 다음으로 진행
                favoriteReaderRepository.deleteByReaderId(favoriteReader.getReaderId());
                continue;
            }
            // 연결이 끊어진 객체가 아니라면 값을 반환한다
            long readerId = favoriteReader.getReaderId();
            ReaderListResponseDto readerTemp = ReaderListResponseDto
                    .builder()
                    .memberId(readerId)
                    .name(reader.getMember().getNickname())
                    .keyword(reader.getKeywords())
                    .intro(reader.getIntro())
                    .rating(reader.getRating())
                    .grade(reader.getGradeCode())
                    .price(reader.getPrice())
                    .build();
            favoriteReaderList.add(readerTemp);
        }

        return favoriteReaderList;
    }

    /**
     * 찜리더 삭제
     * @param request
     * @param readerId
     */
    @Override
    @Transactional
    public void deleteFavoriteReader(HttpServletRequest request, long readerId) {
        long seekerId = cookieUtil.getUserId(request);
        if(favoriteReaderQueryRepository.deleteBySeekerIdAndReaderId(seekerId, readerId) == 0) {
            // 삭제 실패한 경우, Exception 발생
            throw new BusinessException(ErrorCode.FAVORITE_NOT_FOUND);
        }
        // 정상적으로 삭제되었다면 exception을 출력하지 않음
    }
}
