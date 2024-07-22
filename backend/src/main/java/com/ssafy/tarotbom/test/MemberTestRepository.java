package com.ssafy.tarotbom.test;

import com.ssafy.tarotbom.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTestRepository extends JpaRepository<Member, Long> {

}
