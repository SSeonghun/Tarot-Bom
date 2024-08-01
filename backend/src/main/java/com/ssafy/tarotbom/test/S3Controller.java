package com.ssafy.tarotbom.test;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class S3Controller {
    private final S3Service s3service;

    @PostMapping("/upload")
    public String upload(@RequestParam("data") MultipartFile file) throws IOException {
        return s3service.upload(file, "static");
    }
}
