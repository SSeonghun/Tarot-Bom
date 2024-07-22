package com.ssafy.tarotbom.domain.tarot.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.room.entity.Room;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="tarot_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class TarotResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id", columnDefinition = "int unsigned")
    private long resultId;

    /* @ManyToOne으로 연결 : 리더ID, 시커ID, 방 ID, 키워드 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id", columnDefinition = "int unsigned")
    private Member reader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", columnDefinition = "int unsigned")
    private Member seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", columnDefinition = "int unsigned")
    private Room room;

    /* Room에 포함되어있는 정보가 중복되어있긴 한데, 따로 조회할 일이 대부분일 것 같아 분리하였음 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword", columnDefinition = "char(3)")
    private CodeDetail keyword;

    /* @OneToMany로 연결 : 타로결과카드
    * 타로 결과와 함께 거의 무조건 조회되기 때문에, 강력하게 연결하였음 */
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "result")
    private List<TarotResultCard> cardList;

    @Column(name = "date", columnDefinition = "timestamp")
    private LocalDateTime date;

    @Column(name = "memo", length = 1000)
    private String memo;

    @Column(name = "summary", length = 1000)
    private String summary;

    @Column(name = "music", length = 50)
    private String music;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    // create time 자동갱신
    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

}
