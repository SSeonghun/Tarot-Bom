package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.request.FavoriteReaderRequestDto;
import com.ssafy.tarotbom.domain.member.dto.response.FavoriteReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.entity.FavoriteReader;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.repository.FavoriteReaderRepository;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteReaderServiceImpl implements FavoriteReaderService{

    private final ReaderRepository readerRepository;
    private final MemberRepository memberRepository;
    private final FavoriteReaderRepository favoriteReaderRepository;
    private final CookieUtil cookieUtil;

    /**
     * 찜리더 추가
     * @param favoriteReaderRequestDto
     */
    @Override
    public void addFavoriteReader(FavoriteReaderRequestDto favoriteReaderRequestDto) {

        Reader reader = readerRepository.findById(favoriteReaderRequestDto.getReaderId());
        Optional<Member> seeker = memberRepository.findMemberByMemberId(favoriteReaderRequestDto.getSeekerId());

        //todo: 이미 찜한 사람이면?

        FavoriteReader favoriteReader = FavoriteReader
                .builder()
                .reader(reader.getMember())
                .seeker(seeker.get())
                .createTime(LocalDateTime.now())
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

        List<FavoriteReader> favoriteReaders = favoriteReaderRepository.findBySeekerId(seekerId);


        return null;
    }


}
