package com.ssafy.tarotbom.domain.member.service;

import com.ssafy.tarotbom.global.error.BusinessException;
import com.ssafy.tarotbom.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender emailSender;


    // 이메일 발송
    public void sendEmail(String toEmail, String title, String text) {
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);

        try{
            emailSender.send(emailForm);
        } catch(RuntimeException e){
            log.debug("MailService.sendEmail Exception occur toEmail : {}, " + "title : {}, text: {}", toEmail, title, text );
            throw new BusinessException(ErrorCode.MEMBER_INVALID_EMAIL);
        }
    }

    // 수신자의 이메일 주소, 제목, 내용을 입력받아 SimpleMailMessage 객체를 생성해 반환하는 메서드
    private SimpleMailMessage createEmailForm(String toEmail, String title, String text){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }
}
