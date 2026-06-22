package com.jobportal.smartjobportal.savedjob;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedJobRepository
        extends JpaRepository<SavedJob,Long>{

    List<SavedJob> findByUserId(Long userId);

    long countByUserId(Long userId);

    boolean existsByUserIdAndJobId(
            Long userId,
            Long jobId
    );

}