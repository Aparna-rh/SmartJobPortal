package com.jobportal.smartjobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.smartjobportal.entity.Notification;
import com.jobportal.smartjobportal.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification create(@RequestBody Notification notification) {
        return notificationService.save(notification);
    }

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(
            @PathVariable Long userId) {

        return notificationService.getUserNotifications(userId);
    }
}