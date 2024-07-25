package com.ssafy.tarotbom.domain.member.repository;


import com.ssafy.tarotbom.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMemberByEmail(String email);
}
