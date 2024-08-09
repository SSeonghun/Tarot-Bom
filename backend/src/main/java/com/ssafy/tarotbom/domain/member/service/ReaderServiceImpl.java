package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.domain.member.dto.ReaderAbstractReviewDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderDetailResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.ReaderListResponseDto;
import com.ssafy.tarotbom.domain.member.dto.response.TopReaderResponseDto;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderQueryRepository;
import com.ssafy.tarotbom.domain.member.repository.ReaderRepository;
import com.ssafy.tarotbom.domain.reservation.repository.ReservationRepository;
import com.ssafy.tarotbom.domain.review.entity.ReviewReader;
import com.ssafy.tarotbom.domain.review.repository.ReviewReaderRepository;
import com.ssafy.tarotbom.domain.shop.dto.response.ShopReadResponseDto;
import com.ssafy.tarotbom.domain.shop.entity.Shop;
import com.ssafy.tarotbom.domain.shop.repository.ShopRepository;
import com.ssafy.tarotbom.domain.tarot.repository.TarotResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
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
    private final ReaderQueryRepository readerQueryRepository;
    private final ShopRepository shopRepository;

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
                .map(reader -> new ReaderListResponseDto(reader.getMemberId()
                        ,reader.getMember().getProfileUrl()
                        ,reader.getMember().getNickname()
                        ,reader.getKeywords(), reader.getIntro()
                        ,reader.getRating()
                        , reader.getGradeCode()
                        ,reader.getPrice()))
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
    public ReaderDetailResponseDto searchReaderDetail(long readerId) {
        Reader reader = readerRepository.findByMemberId(readerId);
        Member memberReader = memberRepository.getReferenceById(readerId);
        // Optional : null 값 반환을 막기 위한 클래스
        Optional<ReviewReader> reviewReader = reviewReaderRepository.findById(readerId);
        
        // 리더 이름을 가져오기위함
//        Optional<Member> isMember = memberRepository.findMemberByMemberId(readerId);
//
//        // todo: 값이 없을경우 있나? 그래도 처리
//        // 값이 있으면
//        Member member = isMember.get();
        Member member = reader.getMember();

        int allReservations = reservationRepository.countByReaderId(readerId);

        int allConsulting = tarotResultRepository.countByReaderId(readerId);

        LocalDateTime createTime = reader.getCreateTime();
        LocalDateTime now = LocalDateTime.now();
        // int로 반환?
        int afterReader = (int) ChronoUnit.DAYS.between(createTime, now);

        List<ReviewReader> reviewReaders = reviewReaderRepository.findByReader(Optional.of(memberReader));

        List<ReaderAbstractReviewDto> reviewList = new ArrayList<>();
        for(ReviewReader review : reviewReaders) {
            reviewList.add(
                    ReaderAbstractReviewDto.builder()
                            .reviewReaderId(review.getReviewReaderId())
                            .seekerId(review.getSeekerId())
                            .seekerName(review.getSeeker().getNickname())
                            .seekerProfileUrl(review.getSeeker().getProfileUrl())
                            .readerId(review.getReaderId())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .build()
            );
        }
        // shop 정보 찾기
        Shop shop = shopRepository.findByReaderId(readerId);
        ShopReadResponseDto shopInfo =  ShopReadResponseDto.builder()
                .shopId(shop.getShopId())
                .readerId(shop.getReaderId())
                .shopName(shop.getShopName())
                .address(shop.getAddress())
                .phone(shop.getPhone())
                .longitude(shop.getLongitude())
                .latitude(shop.getLatitude())
                .build();
        // todo: 상담횟수, 예약횟수, 리더가 된지 몇일? 비즈니스 로직 필요
        //todo: 리뷰 리스트 생성에서 넣어주기
        // 리뷰 리스트 생성
        ReaderDetailResponseDto readerDetailResponseDto = ReaderDetailResponseDto
                .builder()
                .memberId(reader.getMemberId())
                .name(member.getNickname())
                .keyword(reader.getKeywords())
                .intro(reader.getIntro())
                .rating(reader.getRating())
                .grade(reader.getGradeCode())
                .profileUrl(reader.getMember().getProfileUrl())
                .price(reader.getPrice())
                .reviews(reviewList)
                .allConsultings(allConsulting)
                .allReservations(allReservations)
                .afterReader(afterReader)
                .shopInfo(shopInfo)
                .build();

        return readerDetailResponseDto;
    }

    @Override
    public List<TopReaderResponseDto> searchTopReader() {
        List<Reader> queryResult =  readerQueryRepository.findTopReader();
        List<TopReaderResponseDto> result = new ArrayList<>();
        for(Reader reader : queryResult)  {
            result.add(TopReaderResponseDto
                    .builder()
                    .nickname(reader.getMember().getNickname())
                    .profileUrl(reader.getMember().getProfileUrl())
                    .readerId(reader.getMemberId())
                    .intro(reader.getIntro())
                    .rating(reader.getRating())
                    .keyword(reader.getKeywords())
                    .build()
            );
        }
        return result;
    }

}
