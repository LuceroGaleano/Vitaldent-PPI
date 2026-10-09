package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.LoginRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.LoginResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.AuthUseCase;
import com.odontologia.Vitaldent_PPI.infrastructure.security.JwtUtil;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthUseCase authUseCase;
    private final JwtUtil jwtUtil;

    public AuthController(AuthUseCase authUseCase, JwtUtil jwtUtil) {
        this.authUseCase = authUseCase;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        String token = authUseCase.login(request.getUsername(), request.getPassword());
        String document = jwtUtil.extractDocument(token);
        String role = jwtUtil.extractRole(token);
        return ResponseEntity.ok(new LoginResponse(token, document, role));
    }
}