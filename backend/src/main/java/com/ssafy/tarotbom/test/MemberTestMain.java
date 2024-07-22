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
                .nickname(req.get("nickname"))
                .email(req.get("email"))
                .password(req.get("password"))
                .profileUrl(req.get("profileUrl"))
                .token(req.get("token"))
                .build();
        mtr.save(m);
        return ResponseEntity.ok().build();
    }

}
