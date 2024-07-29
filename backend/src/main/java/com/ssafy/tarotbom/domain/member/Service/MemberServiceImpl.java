package com.ssafy.tarotbom.domain.member.Service;

import com.ssafy.tarotbom.domain.member.dto.CustomUserInfoDto;
import com.ssafy.tarotbom.domain.member.dto.LoginReqDto;
import com.ssafy.tarotbom.domain.member.dto.SignupReqDto;
import com.ssafy.tarotbom.domain.member.entity.Member;
import com.ssafy.tarotbom.domain.member.jwt.JwtUtil;
import com.ssafy.tarotbom.domain.member.repository.MemberRepository;
import com.ssafy.tarotbom.global.code.entity.CodeDetail;
import com.ssafy.tarotbom.global.dto.BasicMessageDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public BasicMessageDto login(LoginReqDto loginReqDto, HttpServletResponse response) throws BadCredentialsException, UsernameNotFoundException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();

        Member member = memberRepository.findMemberByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("이메일이 존재하지 않습니다.")
        );

        // 암호화된 password를 디코딩 한 결과값과 입력한 패스워드 값이 다르면 null 반환
        if(!passwordEncoder.matches(password, member.getPassword())){
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        CustomUserInfoDto info = modelMapper.map(member, CustomUserInfoDto.class);

        response.addHeader(JwtUtil.AUTHORIZATION_HEADER, jwtUtil.createAccessToken(info));

        return new BasicMessageDto("로그인 성공");

    }

    @Override
    @Transactional
    public BasicMessageDto signup(SignupReqDto signupReqDto) throws DataIntegrityViolationException, IllegalArgumentException {
        BCryptPasswordEncoder bcrypasswordEncoder = new BCryptPasswordEncoder();

        String nickname = signupReqDto.getNickname();
        String email = signupReqDto.getEmail();
        String password = bcrypasswordEncoder.encode(signupReqDto.getPassword());

        Optional<Member> findMemberByNickname = memberRepository.findMemberByNickname(nickname);
        if(findMemberByNickname.isPresent()){
            throw new IllegalArgumentException("중복된 닉네임이 존재합니다.");
        }

        Optional<Member> findMemberByEmail = memberRepository.findMemberByEmail(email);
        if(findMemberByEmail.isPresent()){
            throw new IllegalArgumentException("중복된 이메일이 존재합니다.");
        }

        CodeDetail codeDetail = new CodeDetail("M01", "Seeker", "1"); // DB에 저장된 후에 코드 refactoring

        Member member = new Member(nickname, email, password, codeDetail);
        memberRepository.save(member);

        return new BasicMessageDto("회원가입 성공");

    }
}
