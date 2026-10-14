package com.odontologia.Vitaldent_PPI.domain.ports.out;

public interface NotificationPort {
    void sendEmail(String email, String subject, String body);
}