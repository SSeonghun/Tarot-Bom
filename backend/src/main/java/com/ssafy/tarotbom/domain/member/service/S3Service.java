package com.ssafy.tarotbom.domain.member.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 s3;
    // S3 버킷명
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.front.domain}")
    private String frontDomain;

    // Multipart file을 받아 S3에 업로드
    public String upload(MultipartFile file, String dirName) throws IOException {
        File uploadFile = convert(file)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 변환 실패"));
        log.info(bucket);
        return upload(uploadFile, dirName);
    }

    // 업로드 후 URL 반환하는 메서드
    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();
        putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return "https://"+frontDomain+"/"+fileName;
    }

    private void removeNewFile(File uploadFile) {
        if(uploadFile.delete()){
            log.info("서버 파일 삭제");
        } else {
            log.info("서버 파일 삭제 실패");
        }
    }

    private void putS3(File uploadFile, String fileName) {
        s3.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    // Multipart file -> File로 변경
    private Optional<File> convert(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        // UUID와 원본파일 이름을 조합
        String uuidFileName = uuid+"_"+fileName.replaceAll("\\s", "_");

        File resultFile = new File(uuidFileName);
        if(resultFile.createNewFile()){
            try(FileOutputStream fos = new FileOutputStream(resultFile)){
                fos.write(file.getBytes());
            }
            return Optional.of(resultFile);
        }
        return Optional.empty();
    }

}
