package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.request.FavoriteReaderRequestDto;
import com.ssafy.tarotbom.domain.member.entity.FavoriteReader;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.repository.FavoriteReaderRepository;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteReaderServiceImpl implements FavoriteReaderService{

    private final ReaderRepository readerRepository;
    private final MemberRepository memberRepository;
    private final FavoriteReaderRepository favoriteReaderRepository;

    /**
     * 찜리더 추가
     * @param favoriteReaderRequestDto
     */
    @Override
    public void addFavoriteReader(FavoriteReaderRequestDto favoriteReaderRequestDto) {

        Reader reader = readerRepository.findById(favoriteReaderRequestDto.getReaderId());
        Optional<Member> seeker = memberRepository.findMemberByMemberId(favoriteReaderRequestDto.getSeekerId());

        FavoriteReader favoriteReader = FavoriteReader
                .builder()
                .reader(reader.getMember())
                .seeker(seeker.get())
                .createTime(LocalDateTime.now())
                .build();

        favoriteReaderRepository.save(favoriteReader);

    }
}
