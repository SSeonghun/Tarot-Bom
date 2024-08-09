package com.ssafy.tarotbom.global.code.repository;

import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodeDetailRepository extends JpaRepository<CodeDetail, String> {

    // 기본적인 CRUD 메서드는 JpaRepository에서 제공됩니다.
    // 필요한 경우 추가적인 메서드를 정의할 수 있습니다.

    // 예: ID로 CodeDetail 객체 조회
    Optional<CodeDetail> findById(String codeDetailId);

    // 예: codeTypeId로 CodeDetail 객체 조회
    List<CodeDetail> findByCodeTypeId(String codeTypeId);

    // 예: detailDesc로 CodeDetail 객체 조회
    Optional<CodeDetail> findByDetailDesc(String detailDesc);
}
