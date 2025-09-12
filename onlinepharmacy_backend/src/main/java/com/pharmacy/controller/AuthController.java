package com.pharmacy.controller;

import com.pharmacy.model.User;
import com.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // check unique username
        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.put("error", "Username already taken");
            return ResponseEntity.badRequest().body(response);
        }

        // check unique email
        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("error", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }

        // encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        Map<String, Object> response1 = new HashMap<>();
        response1.put("message", "User registered successfully");
        response1.put("userId", savedUser.getUserId());
        response1.put("username", savedUser.getUsername());
        response1.put("email", savedUser.getEmail());
        response1.put("role", savedUser.getRole());

        return ResponseEntity.ok(response1);
    }

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();

        User user = userRepository.findByUsername(username);

        if (user == null) {
            response.put("error", "User not found");
            return ResponseEntity.badRequest().body(response);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("error", "Invalid password");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "Login successful");
        response.put("userId", String.valueOf(user.getUserId()));
        response.put("role", user.getRole());
        return ResponseEntity.ok(response);
    }
}
