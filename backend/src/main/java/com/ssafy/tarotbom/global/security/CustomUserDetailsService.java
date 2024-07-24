package com.ssafy.tarotbom.global.security;

import com.ssafy.tarotbom.domain.member.dto.CustomUserInfoDto;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    // JWT에서 추출한 유저 식별자(memberId)와 일치하는 member가 데이터베이스에 존재하는지의 여부를 판단
    // Auth 객체(UserPasswordAuthenticationToken)를 만들 때 필요한 UserDetails 객체로 반환
    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저가 없습니다."));

        CustomUserInfoDto dto = mapper.map(member, CustomUserInfoDto.class);

        return new CustomUserDetails(dto);
    }
}
