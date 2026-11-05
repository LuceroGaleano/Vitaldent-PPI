package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;
import com.odontologia.Vitaldent_PPI.infrastructure.security.JwtUtil;

@Service
public class LoginUser {
    private final PasswordEncoder passwordEncoder;
    private final UserPort userPort;
    private final JwtUtil jwtUtil;

    public LoginUser(UserPort userPort, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userPort = userPort;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String excute(String identifier, String password) throws BusinessException {
        String login = identifier == null ? "" : identifier.trim();

        User user = userPort.findByUserName(login);
        if (user == null) {
            user = userPort.findByEmail(login);
        }

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new BusinessException("Haz ingresado mal un dato");
        }

        return jwtUtil.generateToken(user.getDocument(), user.getUserName(), user.getRol().toString());
    }
}