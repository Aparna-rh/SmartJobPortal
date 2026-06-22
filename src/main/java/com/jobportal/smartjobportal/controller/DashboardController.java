package com.jobportal.smartjobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.smartjobportal.application.ApplicationRepository;
import com.jobportal.smartjobportal.dto.DashboardDTO;
import com.jobportal.smartjobportal.repository.JobRepository;
import com.jobportal.smartjobportal.savedjob.SavedJobRepository;

@RestController
@CrossOrigin(origins="*")
public class DashboardController {


    @Autowired
    private ApplicationRepository applicationRepository;


    @Autowired
    private SavedJobRepository savedJobRepository;


    @Autowired
    private JobRepository jobRepository;



    @GetMapping("/api/dashboard")
    public DashboardDTO getDashboard(){


        DashboardDTO dashboard = new DashboardDTO();



        dashboard.setTotalJobs(

                (int)jobRepository.count()

        );



        dashboard.setAppliedJobs(

                (int)applicationRepository.countByUserId(1L)

        );



        dashboard.setShortlisted(

                (int)applicationRepository.countByStatus(
                        "Shortlisted"
                )

        );



        dashboard.setInterviews(

                (int)applicationRepository.countByStatus(
                        "Interview"
                )

        );



        dashboard.setSavedJobs(

                (int)savedJobRepository.countByUserId(1L)

        );



        return dashboard;

    }

}