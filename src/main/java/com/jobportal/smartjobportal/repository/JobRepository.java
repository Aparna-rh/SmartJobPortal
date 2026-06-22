package com.jobportal.smartjobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.smartjobportal.entity.Job;

public interface JobRepository extends JpaRepository<Job,Long>{

    List<Job> findByTitleContainingIgnoreCase(String title);

    List<Job> findByCompanyContainingIgnoreCase(String company);

    List<Job> findByLocationContainingIgnoreCase(String location);

}