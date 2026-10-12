package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.UserRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.UserResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.CommonUserUseCase;
import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class CommonUserController {
    private final CommonUserUseCase commonUserUseCase;
    private final UserPort userPort;

    public CommonUserController(CommonUserUseCase commonUserUseCase, UserPort userPort) {
        this.commonUserUseCase = commonUserUseCase;
        this.userPort = userPort;
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(@Valid @RequestBody UserRequest request) {
        User authenticatedUser = getAuthenticatedUser();
        User user = toUser(request);
        user.setUserId(authenticatedUser.getUserId());
        user.setDocument(authenticatedUser.getDocument());
        user.setRol(authenticatedUser.getRol());
        user.setPatientId(authenticatedUser.getPatientId());
        commonUserUseCase.updateUser(user, authenticatedUser.getUserId());
        return ResponseEntity.ok(toUserResponse(user));
    }

    private User getAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getDetails() instanceof String document)) {
            throw new BusinessException("No se pudo identificar al usuario autenticado");
        }
        User user = userPort.findByDocument(document);
        if (user == null) {
            throw new BusinessException("No se encontró al usuario autenticado");
        }
        return user;
    }

    private User toUser(UserRequest request) {
        User user = new User();
        user.setUserName(request.getUserName());
        user.setPassword(request.getPassword());
        user.setFullName(request.getFullName());
        user.setDocument(request.getDocument());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setBirthDate(request.getBirthDate());
        user.setRol(request.getRol());
        user.setPatientId(request.getPatientId());
        return user;
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getUserId(), user.getUserName(), user.getFullName(), user.getDocument(),
                user.getEmail(), user.getPhone(), user.getAddress(), user.getBirthDate(),
                user.getRol(), user.getPatientId());
    }
}