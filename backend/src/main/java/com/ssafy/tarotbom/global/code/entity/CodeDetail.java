package com.ssafy.tarotbom.global.code.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="code_detail")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class CodeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_detail_id", columnDefinition = "int unsigned")
    private long codeDetailId;

    @Column(name = "detail_desc")
    private String detailDesc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code_type_id")
    private CodeType codeType;
}
