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
import jakarta.validation.ConstraintViolationException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public BasicMessageDto login(LoginReqDto loginReqDto, HttpServletResponse response){
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        Member member = memberRepository.findMemberByEmail(email);

        if(member == null){
            throw new UsernameNotFoundException("이메일이 존재하지 않습니다.");
        }

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
    public BasicMessageDto signup(SignupReqDto signupReqDto) throws DataIntegrityViolationException {
        BCryptPasswordEncoder bcrypasswordEncoder = new BCryptPasswordEncoder();

        String nickname = signupReqDto.getNickname();
        String email = signupReqDto.getEmail();
        String password = bcrypasswordEncoder.encode(signupReqDto.getPassword());

        CodeDetail codeDetail = new CodeDetail("M01", "Seeker", "1");

        Member member = new Member(2, nickname, email, password, null, null, null, null, codeDetail, null, null);
        memberRepository.save(member);

        return new BasicMessageDto("회원가입 성공");

    }
}
