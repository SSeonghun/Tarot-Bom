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
    @Column(name = "code_type_id", columnDefinition = "int unsigned")
    private long codeTypeId;

    @Column(name = "type_desc", length=20)
    private String typeDesc;

}
