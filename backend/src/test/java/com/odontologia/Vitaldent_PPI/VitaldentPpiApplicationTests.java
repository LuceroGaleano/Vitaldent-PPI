package com.odontologia.Vitaldent_PPI;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.AppointmentRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PatientRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;

@SpringBootTest(properties = "app.seed.enabled=true")
class VitaldentPpiApplicationTests {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${app.seed.password}")
	private String seedPassword;

	@Test
	void contextLoads() {
		assertTrue(patientRepository.count() >= 15);
		assertTrue(appointmentRepository.count() >= 20);

		var patientAccount = userRepository.findByUserName("paciente15");
		assertNotNull(patientAccount);
		assertTrue(passwordEncoder.matches(seedPassword, patientAccount.getPassword()));
		assertEquals("Medellín, Antioquia", patientAccount.getAddress());
		assertTrue(patientRepository.findByDocument("1000000004").getAddress().contains("Medellín"));
	}

}
