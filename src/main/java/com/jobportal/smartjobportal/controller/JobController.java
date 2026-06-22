package com.jobportal.smartjobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.smartjobportal.entity.Job;
import com.jobportal.smartjobportal.repository.JobRepository;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobRepository repository;


    // ==========================
    // GET ALL JOBS
    // ==========================
    @GetMapping
    public List<Job> getAllJobs() {

        return repository.findAll();

    }


    // ==========================
    // GET JOB BY ID
    // ==========================
    @GetMapping("/{id}")
    public Job getJobById(
            @PathVariable Long id
    ) {

        return repository.findById(id)
                .orElse(null);

    }


    // ==========================
    // SEARCH JOBS
    // ==========================
    @GetMapping("/search")
    public List<Job> searchJobs(

            @RequestParam String keyword

    ) {

        return repository.findByTitleContainingIgnoreCase(keyword);

    }


    // ==========================
    // ADD JOB
    // ==========================
    @PostMapping
    public Job addJob(

            @RequestBody Job job

    ) {

        return repository.save(job);

    }


    // ==========================
    // UPDATE JOB
    // ==========================
    @PutMapping("/{id}")
    public Job updateJob(

            @PathVariable Long id,

            @RequestBody Job updatedJob

    ) {

        Job job = repository.findById(id)
                .orElse(null);

        if (job == null) {
            return null;
        }

        job.setTitle(updatedJob.getTitle());
        job.setCompany(updatedJob.getCompany());
        job.setLocation(updatedJob.getLocation());
        job.setDescription(updatedJob.getDescription());
        job.setSalary(updatedJob.getSalary());

        return repository.save(job);

    }


    // ==========================
    // DELETE JOB
    // ==========================
    @DeleteMapping("/{id}")
    public String deleteJob(

            @PathVariable Long id

    ) {

        if (!repository.existsById(id)) {
            return "Job Not Found";
        }

        repository.deleteById(id);

        return "Job Deleted Successfully";

    }

}