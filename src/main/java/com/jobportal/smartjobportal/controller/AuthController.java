package com.jobportal.smartjobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.smartjobportal.entity.User;
import com.jobportal.smartjobportal.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Register
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        User existing = userRepository.findByEmail(user.getEmail());

        if(existing != null){
            return "Email already exists";
        }

        userRepository.save(user);

        return "Registered Successfully";
    }

    // Login
    @PostMapping("/login")
    public Object login(@RequestBody User user){

        User dbUser = userRepository.findByEmail(user.getEmail());

        if(dbUser == null){
            return "User not found";
        }

        if(!dbUser.getPassword().equals(user.getPassword())){
            return "Invalid Password";
        }

        return dbUser;
    }

}