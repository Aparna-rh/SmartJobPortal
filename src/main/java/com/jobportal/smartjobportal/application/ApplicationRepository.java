package com.jobportal.smartjobportal.application;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository
        extends JpaRepository<Application,Long>{

    List<Application> findByUserId(Long userId);

    long countByStatus(String status);

    long countByUserId(Long userId);

}