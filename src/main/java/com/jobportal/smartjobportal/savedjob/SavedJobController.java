package com.jobportal.smartjobportal.savedjob;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/savedjobs")
@CrossOrigin(origins = "*")
public class SavedJobController {

    @Autowired
    private SavedJobRepository repo;


    // Save Job
    @PostMapping
    public SavedJob saveJob(@RequestBody SavedJob savedJob) {

        return repo.save(savedJob);

    }


    // Get Saved Jobs of User
    @GetMapping("/{userId}")
    public List<SavedJob> getSavedJobs(

            @PathVariable Long userId

    ) {

        return repo.findByUserId(userId);

    }


    // Delete Saved Job
    @DeleteMapping("/{id}")
    public String deleteSavedJob(

            @PathVariable Long id

    ) {

        repo.deleteById(id);

        return "Deleted Successfully";

    }

}