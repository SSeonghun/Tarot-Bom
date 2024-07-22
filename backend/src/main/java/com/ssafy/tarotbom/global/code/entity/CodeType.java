package com.ssafy.tarotbom.global.code.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="code_type")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class CodeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_type_id", columnDefinition = "int unsigned")
    private long codeTypeId;

    @Column(name = "type_desc")
    private String typeDesc;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "codeType")
    private List<CodeDetail> codeDetail;

}
