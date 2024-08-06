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
//
//        Reader reader = readerRepository.findByMemberId(favoriteReaderRequestDto.getReaderId());
//        Optional<Member> seeker = memberRepository.findMemberByMemberId(favoriteReaderRequestDto.getSeekerId());

        // 해당 맴버 찜목록 조회
        // 만약 이미 찜한 리더면 오류 던지기
//        List<FavoriteReader> favoriteReaders = favoriteReaderRepository.findBySeeker(seeker.get());
//        for(int i = 0; i < favoriteReaders.size(); i++) {
//            long readerId = favoriteReaders.get(i).getReader().getMemberId();
//            if(favoriteReaders.get(i).getReader().getMemberId() == favoriteReaderRequestDto.getReaderId()){
//                throw new BusinessException(ErrorCode.FAVORITE_DUPLICATED);
//            }
//        }
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
    public FavoriteReaderListResponseDto searchFavoriteReader(HttpServletRequest request) {

        long seekerId = cookieUtil.getUserId(request);

        Optional<Member> seeker = memberRepository.findMemberByMemberId(seekerId);

        if (seeker.isEmpty()) {
            // 적절한 예외 처리
            throw new RuntimeException("Seeker not found");
        }

        // 해당 시커의 찜 목록
        List<FavoriteReader> favoriteReaders = favoriteReaderRepository.findBySeeker(seeker.get());

        log.info("Favorite readers count: {}", favoriteReaders.size());

        // favoriteReaderList 초기화
        List<ReaderListResponseDto> favoriteReaderList = new ArrayList<>();

        for (FavoriteReader favoriteReader : favoriteReaders) {
            long readerId = favoriteReader.getReader().getMemberId();

            Optional<Reader> readerOptional = Optional.ofNullable(readerRepository.findByMemberId(readerId));
            if (readerOptional.isEmpty()) {
                // 적절한 예외 처리
                throw new RuntimeException("Reader not found");
            }
            Reader reader = readerOptional.get();

            Optional<Member> readerNameOptional = memberRepository.findMemberByMemberId(readerId);
            if (readerNameOptional.isEmpty()) {
                // 적절한 예외 처리
                throw new RuntimeException("Member not found");
            }
            Member readerName = readerNameOptional.get();

            ReaderListResponseDto readerTemp = ReaderListResponseDto
                    .builder()
                    .memberId(readerId)
                    .name(readerName.getNickname())
                    .memberType("M03")  // 하드코딩된 값. 필요에 따라 변경
                    .keyword(reader.getKeyword().getCodeDetailId())
                    .intro(reader.getIntro())
                    .rating(reader.getRating())
                    .grade(reader.getGrade().getCodeDetailId())
                    .price(reader.getPrice())
                    .build();

            favoriteReaderList.add(readerTemp);
        }

        FavoriteReaderListResponseDto favoriteReaderListResponseDto = FavoriteReaderListResponseDto
                .builder()
                .readerListResponseDtos(favoriteReaderList)
                .build();

        return favoriteReaderListResponseDto;
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
