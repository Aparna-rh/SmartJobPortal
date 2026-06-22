package com.jobportal.smartjobportal.application;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.smartjobportal.entity.Notification;
import com.jobportal.smartjobportal.repository.NotificationRepository;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationRepository repo;

    @Autowired
    private NotificationRepository notificationRepository;

    // Get All Applications
    @GetMapping
    public List<Application> getAll() {
        return repo.findAll();
    }

    // Apply For Job
    @PostMapping
    public Application save(@RequestBody Application app) {

        app.setStatus("Applied");

        return repo.save(app);
    }

    // Get Applications By User
    @GetMapping("/{userId}")
    public List<Application> byUser(@PathVariable Long userId) {

        return repo.findByUserId(userId);
    }

    // Update Application Status
    @PutMapping("/{id}/{status}")
    public Application updateStatus(
            @PathVariable Long id,
            @PathVariable String status) {

        Application app = repo.findById(id)
                .orElse(null);

        if (app == null) {
            return null;
        }

        app.setStatus(status);

        Application updatedApp = repo.save(app);

        Notification notification = new Notification();

        notification.setUserId(app.getUserId());

        String message = "";

        switch (status) {

            case "Shortlisted":
                message = "🎉 Your application for "
                        + app.getRole()
                        + " at "
                        + app.getCompany()
                        + " has been shortlisted.";
                break;

            case "Interview":
                message = "📅 You have been invited for an interview for "
                        + app.getRole()
                        + " at "
                        + app.getCompany()
                        + ".";
                break;

            case "Accepted":
                message = "✅ Congratulations! Your application for "
                        + app.getRole()
                        + " at "
                        + app.getCompany()
                        + " has been accepted.";
                break;

            case "Rejected":
                message = "❌ Your application for "
                        + app.getRole()
                        + " at "
                        + app.getCompany()
                        + " was not selected.";
                break;

            default:
                message = "Application status updated to " + status;
        }

        notification.setMessage(message);

        notificationRepository.save(notification);

        return updatedApp;
    }

    // Delete Application
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {

        if (!repo.existsById(id)) {
            return "Application Not Found";
        }

        repo.deleteById(id);

        return "Application Deleted Successfully";
    }
}