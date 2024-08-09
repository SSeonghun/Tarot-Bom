package com.ssafy.tarotbom.domain.shop.entity;

import com.ssafy.tarotbom.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="shop")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id", columnDefinition = "int unsigned")
    private long shopId;

    /* @ManyToOne으로 연결 : 등록자 리더 ID */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reader_id", columnDefinition = "int unsigned", insertable = false, updatable = false)
    private Member reader;

    @NotNull
    @Column(name = "shop_name", length=30)
    private String shopName;

    @NotNull
    @Column(name = "address")
    private String address;

    @Column(name = "phone", length=20)
    private String phone;

    @NotNull
    @Column(name = "longitude", columnDefinition = "decimal(11, 8)")
    private double longitude;

    @NotNull
    @Column(name = "latitude", columnDefinition = "decimal(10, 8)")
    private double latitude;

    @NotNull
    @Column(name = "reader_id", columnDefinition = "int unsigned")
    private long readerId;

    @Column(name = "create_time", columnDefinition = "timestamp")
    private LocalDateTime createTime;

    @Column(name = "update_time", columnDefinition = "timestamp")
    private LocalDateTime updateTime;

    // create time, update time 자동갱신
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createTime = now;
        this.updateTime = now;
    }

    // update time 자동갱신
    @PreUpdate
    public void preUpdate() {
        this.updateTime = LocalDateTime.now();
    }
}
