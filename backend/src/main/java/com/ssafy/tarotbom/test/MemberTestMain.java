package com.ssafy.tarotbom.test;

import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.entity.Reader;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/test")
@AllArgsConstructor
public class MemberTestMain {
    private MemberTestRepository mtr;
    private ReaderTestRepository rtr;

    @PostMapping("/join")
    public ResponseEntity<?> joinMember(@RequestBody Map<String, String> req){
        Member m = Member.builder()
                .nickname("주스")
                .email("joo1798@gmail.com")
                .isReader(false)
                .isManager(false)
                .password("1234")
                .profileUrl(null)
                .token(null)
                .build();
        Reader r = Reader.builder().intro(null).rating(0).price(10000).member(m).build();
        mtr.save(m);
        rtr.save(r);
        return ResponseEntity.ok().build();
    }

}
