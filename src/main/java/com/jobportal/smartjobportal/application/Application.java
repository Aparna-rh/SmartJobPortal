package com.jobportal.smartjobportal.application;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long userId;


    private String name;

    private String email;

    private String phone;

    private String resume;


    private String company;

    private String role;


    private String status;


    private String appliedDate;



    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }



    public Long getUserId() {
        return userId;
    }


    public void setUserId(Long userId) {
        this.userId = userId;
    }



    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }



    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }



    public String getPhone() {
        return phone;
    }


    public void setPhone(String phone) {
        this.phone = phone;
    }



    public String getResume() {
        return resume;
    }


    public void setResume(String resume) {
        this.resume = resume;
    }



    public String getCompany() {
        return company;
    }


    public void setCompany(String company) {
        this.company = company;
    }



    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }



    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }



    public String getAppliedDate() {
        return appliedDate;
    }


    public void setAppliedDate(String appliedDate) {
        this.appliedDate = appliedDate;
    }

}