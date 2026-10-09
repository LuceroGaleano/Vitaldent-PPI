package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.AppointmentEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PatientEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.UserEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.AppointmentRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PatientRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;

@Service
public class AppointmentPersistenceAdapter implements AppointmentPort {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public AppointmentPersistenceAdapter(
        AppointmentRepository appointmentRepository,
        PatientRepository patientRepository,
        UserRepository userRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Appointment findById(UUID appointmentId) {
        return toModel(appointmentRepository.findById(appointmentId).orElse(null));
    }

    @Override
    public List<Appointment> findByPatient(Patient patient) {
        if (patient == null || patient.getPatientId() == null) {
            return List.of();
        }
        return toModels(appointmentRepository.findByPatient_PatientId(patient.getPatientId()));
    }

    @Override
    public List<Appointment> findByDoctor(User user) {
        if (user == null || user.getUserId() == null) {
            return List.of();
        }
        return toModels(appointmentRepository.findByDoctor_UserId(user.getUserId()));
    }

    @Override
    public boolean existsById(UUID id) {
        return appointmentRepository.existsById(id);
    }

    @Override
    public boolean existsByDoctorAndDateAndHour(UUID doctorId, LocalDate date, LocalTime hour) {
        return appointmentRepository.existsByDoctor_UserIdAndDateAndHour(doctorId, date, hour);
    }

    @Override
    public boolean existsByPatientAndDateAndHour(UUID patientId, LocalDate date, LocalTime hour) {
        return appointmentRepository.existsByPatient_PatientIdAndDateAndHour(patientId, date, hour);
    }

    @Override
    public void save(Appointment appointment) {
        AppointmentEntity savedEntity = appointmentRepository.save(toEntity(appointment));
        appointment.setAppointmentId(savedEntity.getAppointmentId());
    }

    @Override
    public void update(Appointment appointment) {
        AppointmentEntity existingEntity = appointmentRepository.findById(appointment.getAppointmentId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setDate(appointment.getDate());
            existingEntity.setHour(appointment.getHour());
            existingEntity.setAppointmentStatus(appointment.getAppointmentStatus());
            if (appointment.getPatient() != null) {
                PatientEntity patientEntity = patientRepository
                    .findById(appointment.getPatient().getPatientId()).orElse(null);
                existingEntity.setPatient(patientEntity);
            }
            if (appointment.getDoctor() != null) {
                UserEntity doctorEntity = userRepository
                    .findById(appointment.getDoctor().getUserId()).orElse(null);
                existingEntity.setDoctor(doctorEntity);
            }
            appointmentRepository.save(existingEntity);
        }
    }

    private List<Appointment> toModels(List<AppointmentEntity> entities) {
        List<Appointment> appointments = new ArrayList<>();
        for (AppointmentEntity entity : entities) {
            appointments.add(toModel(entity));
        }
        return appointments;
    }

    private Appointment toModel(AppointmentEntity entity) {
        if (entity == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(entity.getAppointmentId());
        appointment.setDate(entity.getDate());
        appointment.setHour(entity.getHour());
        appointment.setAppointmentStatus(entity.getAppointmentStatus());
        appointment.setPatient(toPatientModel(entity.getPatient()));
        appointment.setDoctor(toUserModel(entity.getDoctor()));
        return appointment;
    }

    private Patient toPatientModel(PatientEntity entity) {
        if (entity == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setPatientId(entity.getPatientId());
        patient.setFullName(entity.getFullName());
        patient.setDocument(entity.getDocument());
        patient.setPhone(entity.getPhone());
        patient.setEmail(entity.getEmail());
        patient.setAddress(entity.getAddress());
        patient.setBirthDate(entity.getBirthDate());
        return patient;
    }

    private User toUserModel(UserEntity entity) {
        if (entity == null) {
            return null;
        }
        User user = new User();
        user.setUserId(entity.getUserId());
        user.setUserName(entity.getUserName());
        user.setPassword(entity.getPassword());
        user.setFullName(entity.getFullName());
        user.setDocument(entity.getDocument());
        user.setEmail(entity.getEmail());
        user.setPhone(entity.getPhone());
        user.setAddress(entity.getAddress());
        user.setBirthDate(entity.getBirthDate());
        user.setRol(entity.getRol());
        if (entity.getPatient() != null) {
            user.setPatientId(entity.getPatient().getPatientId());
        }
        return user;
    }

    private AppointmentEntity toEntity(Appointment appointment) {
        AppointmentEntity entity = new AppointmentEntity();
        entity.setDate(appointment.getDate());
        entity.setHour(appointment.getHour());
        entity.setAppointmentStatus(appointment.getAppointmentStatus());
        if (appointment.getPatient() != null) {
            PatientEntity patientEntity = patientRepository.findById(appointment.getPatient().getPatientId()).orElse(null);
            entity.setPatient(patientEntity);
        }
        if (appointment.getDoctor() != null) {
            UserEntity doctorEntity = userRepository.findById(appointment.getDoctor().getUserId()).orElse(null);
            entity.setDoctor(doctorEntity);
        }
        return entity;
    }
}
