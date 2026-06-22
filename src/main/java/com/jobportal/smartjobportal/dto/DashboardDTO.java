package com.jobportal.smartjobportal.dto;


public class DashboardDTO {


private int totalJobs;

private int appliedJobs;

private int savedJobs;

private int shortlisted;

private int interviews;




public int getTotalJobs() {
return totalJobs;
}

public void setTotalJobs(int totalJobs) {
this.totalJobs = totalJobs;
}


public int getAppliedJobs() {
return appliedJobs;
}

public void setAppliedJobs(int appliedJobs) {
this.appliedJobs = appliedJobs;
}


public int getSavedJobs() {
return savedJobs;
}

public void setSavedJobs(int savedJobs) {
this.savedJobs = savedJobs;
}


public int getShortlisted() {
return shortlisted;
}

public void setShortlisted(int shortlisted) {
this.shortlisted = shortlisted;
}


public int getInterviews() {
return interviews;
}

public void setInterviews(int interviews) {
this.interviews = interviews;
}

}