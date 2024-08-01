package com.ssafy.tarotbom;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class MembeLoginTest {

        @Autowired
        private MemberRepository memberRepository;

        @Test
        public void testFindMemberByEmail() {
            String email = "user10@example.com";
            Optional<Member> member = memberRepository.findMemberByEmail(email);
            assertTrue(member.isPresent());
        }
    }
