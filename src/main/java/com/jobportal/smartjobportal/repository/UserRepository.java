package com.jobportal.smartjobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.smartjobportal.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}