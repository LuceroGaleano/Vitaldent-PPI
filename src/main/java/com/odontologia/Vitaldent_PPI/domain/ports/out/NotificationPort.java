package com.odontologia.Vitaldent_PPI.domain.ports.out;

public interface NotificationPort {

    void sendSms(String phone, String message);
    void sendEmail(String email, String subject, String body);
}