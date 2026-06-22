package com.jobportal.smartjobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.smartjobportal.application.ApplicationRepository;
import com.jobportal.smartjobportal.dto.AdminDashboardDTO;
import com.jobportal.smartjobportal.repository.JobRepository;
import com.jobportal.smartjobportal.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminDashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;


    @GetMapping("/dashboard")
    public AdminDashboardDTO getDashboard(){

        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setUsers((int)userRepository.count());

        dto.setJobs((int)jobRepository.count());

        dto.setApplications((int)applicationRepository.count());

        dto.setInterviews(
                (int)applicationRepository.countByStatus("Interview")
        );

        dto.setOffers(
                (int)applicationRepository.countByStatus("Accepted")
        );

        return dto;
    }
}