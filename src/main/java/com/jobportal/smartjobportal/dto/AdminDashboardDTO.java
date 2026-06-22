package com.jobportal.smartjobportal.dto;

public class AdminDashboardDTO {

    private int users;
    private int jobs;
    private int applications;
    private int interviews;
    private int offers;

    public int getUsers() {
        return users;
    }

    public void setUsers(int users) {
        this.users = users;
    }

    public int getJobs() {
        return jobs;
    }

    public void setJobs(int jobs) {
        this.jobs = jobs;
    }

    public int getApplications() {
        return applications;
    }

    public void setApplications(int applications) {
        this.applications = applications;
    }

    public int getInterviews() {
        return interviews;
    }

    public void setInterviews(int interviews) {
        this.interviews = interviews;
    }

    public int getOffers() {
        return offers;
    }

    public void setOffers(int offers) {
        this.offers = offers;
    }
}