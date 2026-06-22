package com.jobportal.smartjobportal.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.smartjobportal.entity.User;
import com.jobportal.smartjobportal.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    // ==========================
    // REGISTER
    // ==========================
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userRepository.save(user);

    }



    // ==========================
    // LOGIN
    // ==========================
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        User user =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        if(user == null){

            return null;

        }

        if(user.getPassword().equals(
                loginUser.getPassword()
        )){

            return user;

        }

        return null;

    }




    // ==========================
    // GET ALL USERS
    // ==========================
    @GetMapping
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }




    // ==========================
    // GET USER BY ID
    // ==========================
    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id
    ){

        return userRepository.findById(id)
                .orElse(null);

    }




    // ==========================
    // UPDATE PROFILE
    // ==========================
    @PutMapping("/{id}")
    public User updateUser(

            @PathVariable Long id,

            @RequestBody User updatedUser

    ){

        User user = userRepository.findById(id)
                .orElse(null);


        if(user==null){

            return null;

        }


        // Basic
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());


        // Personal
        user.setPhone(updatedUser.getPhone());
        user.setDob(updatedUser.getDob());
        user.setGender(updatedUser.getGender());
        user.setAddress(updatedUser.getAddress());


        // Education
        user.setTenthPercentage(
                updatedUser.getTenthPercentage()
        );

        user.setTwelfthPercentage(
                updatedUser.getTwelfthPercentage()
        );

        user.setCgpa(
                updatedUser.getCgpa()
        );

        user.setCollege(
                updatedUser.getCollege()
        );

        user.setDegree(
                updatedUser.getDegree()
        );


        // Professional
        user.setSkills(
                updatedUser.getSkills()
        );

        user.setExperience(
                updatedUser.getExperience()
        );


        // Social
        user.setLinkedin(
                updatedUser.getLinkedin()
        );

        user.setGithub(
                updatedUser.getGithub()
        );


        // Uploads
        user.setProfileImage(
                updatedUser.getProfileImage()
        );

        user.setResumeUrl(
                updatedUser.getResumeUrl()
        );


        // About
        user.setAboutMe(
                updatedUser.getAboutMe()
        );


        return userRepository.save(user);

    }



    // ==========================
    // UPLOAD RESUME
    // ==========================
    @PostMapping("/uploadResume/{id}")
    public User uploadResume(

            @PathVariable Long id,

            @RequestParam("file")
            MultipartFile file

    ) throws IOException{


        User user = userRepository.findById(id)
                .orElse(null);


        if(user==null){

            return null;

        }


        String uploadDir = "uploads/";


        String fileName =
                file.getOriginalFilename();


        Path path = Paths.get(
                uploadDir + fileName
        );


        Files.write(

                path,

                file.getBytes()

        );


        user.setResumeUrl(

                uploadDir + fileName

        );


        return userRepository.save(user);

    }




    // ==========================
    // DELETE USER
    // ==========================
    @DeleteMapping("/{id}")
    public String deleteUser(

            @PathVariable Long id

    ){

        if(!userRepository.existsById(id)){

            return "User Not Found";

        }

        userRepository.deleteById(id);

        return "Deleted Successfully";

    }


}