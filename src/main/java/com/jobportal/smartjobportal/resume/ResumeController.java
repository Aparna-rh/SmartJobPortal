package com.jobportal.smartjobportal.resume;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    private static final String UPLOAD_DIR =
            "C:/projects/demosmartjobportal/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        File dir = new File(UPLOAD_DIR);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String filename = file.getOriginalFilename();

        File destination = new File(dir, filename);

        file.transferTo(destination);

        return ResponseEntity.ok(
                "Uploaded Successfully : " + filename);
    }


    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> viewResume(
            @PathVariable String filename)
            throws Exception {

        File file = new File(UPLOAD_DIR, filename);

        Resource resource = new UrlResource(
                file.toURI());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + filename + "\"")
                .body(resource);
    }
}