package com.ssafy.tarotbom.global.code.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name="code_detail")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class CodeDetail {

    @Id
    @Column(name = "code_detail_id", columnDefinition = "char(3)")
    private String codeDetailId;

    @NotNull
    @Column(name = "detail_desc", length = 30)
    private String detailDesc;

    // 실제로는 CodeType과 연관관계이지만, 굳이 불러올 필요 없으므로 연결하지는 않는다
    @NotNull
    @Column(name = "code_type_id", columnDefinition = "int unsigned")
    private String codeTypeId;
}
