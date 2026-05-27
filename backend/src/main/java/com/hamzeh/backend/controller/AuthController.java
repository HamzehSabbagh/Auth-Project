package com.hamzeh.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hamzeh.backend.dto.LoginRequest;
import com.hamzeh.backend.dto.RegisterRequest;
import com.hamzeh.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return Map.of("message", "User registered successfully");

    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        boolean success = authService.login(request);

        if (!success) {
            return ResponseEntity
                    .status((HttpStatus.UNAUTHORIZED))
                    .body(Map.of("message", "Invalid email or password"));
        }

        return ResponseEntity.ok(Map.of("message", "Login successful"));
    }
}
