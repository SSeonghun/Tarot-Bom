package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.response.ReaderDetatilResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReviewReaderResponseDto;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.reservation.entity.Reservation;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationRepository;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import com.ssafy.tarotbom.domain.review.repository.ReviewReaderRepository;
import com.ssafy.tarotbom.domain.tarot.entity.TarotResult;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReaderServiceImpl implements ReaderService{

    private final ReaderRepository readerRepository;
    private final ReviewReaderRepository reviewReaderRepository;
    private final MemberRepository memberRepository;
    private final ReservationRepository reservationRepository;
    private final TarotResultRepository tarotResultRepository;

    /**
     * 리더 리스트 전체 반환
     * limit 설정? 해야하나?
     * @return
     */
    @Override
    public List<ReaderListResponseDto> searchAllReader() {
        List<Reader> readers = readerRepository.findAll();

        //todo: 리더 쪽 테이블 확인
        return readers.stream()
                .map(reader -> new ReaderListResponseDto(reader.getMember().getMemberId(),reader.getMember().getNickname(), reader.getMember().getMemberType().getCodeDetailId() ,reader.getKeyword().getCodeDetailId(), reader.getIntro(), reader.getRating(), reader.getGrade().getCodeDetailId(), reader.getPrice()))
                .collect(Collectors.toList());
    }

    /**
     * 시커가 리더프로필 검색 해서 들어온 데이터
     *     private long memberId;
     *     private String name;
     *     private CodeDetail memberType;
     *     private CodeDetail keyword;
     *     private String intro;
     *     private double rating;
     *     private CodeDetail grade;
     *     private int price;
     *
     *     // 기존 리더 리스트DTO에 추가로 더 반환
     *     private int allConsertings;
     *     private int allReaservations;
     *     private int afterReader;
     *
     *     private List<ReviewReader> reviews;
     * @param readerId
     * @return
     */
    @Override
    public ReaderDetatilResponseDto searchReaderDetail(long readerId) {

        Reader reader = readerRepository.findById(readerId);
        // Optional : null 값 반환을 막기 위한 클래스
        Optional<ReviewReader> reviewReader = reviewReaderRepository.findById(readerId);
        
        // 리더 이름을 가져오기위함
        Optional<Member> isMember = memberRepository.findMemberByMemberId(readerId);
        
        // todo: 값이 없을경우 있나? 그래도 처리
        // 값이 있으면
        Member member = isMember.get();

        List<Reservation> reservations = reservationRepository.findAllByReaderId(readerId);
        int allReaservations = reservations.size();

        List<TarotResult> tarotResults = tarotResultRepository.findAllByReaderId(readerId);
        int allConserting = tarotResults.size();

        LocalDateTime createTime = reader.getCreateTime();
        LocalDateTime now = LocalDateTime.now();
        // int로 반환?
        int afterReader = (int) ChronoUnit.DAYS.between(createTime, now);



        // todo: 상담횟수, 예약횟수, 리더가 된지 몇일? 비즈니스 로직 필요

        log.info("{}", reader.getGrade().getCodeTypeId());
        log.info("{}", reader.getGrade().getCodeDetailId());
        
        //todo: 리뷰 리스트 생성에서 넣어주기
        // 리뷰 리스트 생성


        ReaderDetatilResponseDto readerDetatilResponseDto = ReaderDetatilResponseDto
                .builder()
                .memberId(reader.getMemberId())
                .name(member.getNickname())
                .keyword(reader.getKeyword().getDetailDesc())
                .intro(reader.getIntro())
                .rating(reader.getRating())
                .grade(reader.getGrade().getDetailDesc())
                .price(reader.getPrice())
                .allConsertings(allConserting)
                .allReaservations(allReaservations)
                .afterReader(afterReader)
                .build();

        return readerDetatilResponseDto;
    }
}
