package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PatientEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.UserEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PatientRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service
public class UserPersistenceAdapter implements UserPort {
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    public UserPersistenceAdapter(UserRepository userRepository,
        PatientRepository patientRepsoitory
    ){
        this.userRepository = userRepository;
        this.patientRepository = patientRepsoitory;
    }

    @Override 
    public void save(User user){
        UserEntity savedEntity = userRepository.save(toEntity(user));
        user.setUserId(savedEntity.getUserId());
    }

    @Override
    public void update(User user){
        UserEntity  existingUser = userRepository.findById(user.getUserId()).orElse(null);
        if(existingUser != null){
            existingUser.setUserName(user.getUserName());
            existingUser.setPassword(user.getPassword());
            existingUser.setFullName(user.getFullName());
            existingUser.setDocument(user.getDocument());
            existingUser.setEmail(user.getEmail());
            existingUser.setPhone(user.getPhone());
            existingUser.setAddress(user.getAddress());
            existingUser.setBirthDate(user.getBirthDate());
            existingUser.setRol(user.getRol());
            if(user.getPatientId() != null){
                PatientEntity patientEntity = patientRepository.findById(user.getPatientId()).orElse(null);
                existingUser.setPatient(patientEntity);
            }
            userRepository.save(existingUser);
        }
    }

    @Override
    public void deleteByDocument(String document){
        userRepository.deleteByDocument(document);
    }

    @Override
    public boolean existsById(UUID id) {
        return userRepository.existsById(id);
    }

    @Override 
    public boolean existsByDocument(String document){
        return userRepository.existsByDocument(document);
    }

    @Override
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByUserName(String userName){
        return userRepository.existsByUserName(userName);
    }
    

    @Override
    public boolean existsByUserNameAndDocumentNot(String userName, String document){
        return userRepository.existsByUserNameAndDocumentNot(userName, document);
    }

    @Override
    public boolean existsByEmailAndDocumentNot(String email, String document){
        return userRepository.existsByEmailAndDocumentNot(email, document);
    }

    @Override 
    public User findById(UUID id){
        return toModel(userRepository.findById(id).orElse(null));
    }

    @Override 
    public User findByDocument(String document){
        return toModel(userRepository.findByDocument(document));
    }

    @Override
    public User findByUserName(String userName){
        return toModel(userRepository.findByUserName(userName));
    }

    private User toModel(UserEntity e){
        if(e == null) return null;
        User user = new User();
        user.setUserId(e.getUserId());
        user.setUserName(e.getUserName());
        user.setPassword(e.getPassword());
        user.setFullName(e.getFullName());
        user.setDocument(e.getDocument());
        user.setEmail(e.getEmail());
        user.setPhone(e.getPhone());
        user.setAddress(e.getAddress());
        user.setBirthDate(e.getBirthDate());
        user.setRol(e.getRol());
        if(e.getPatient() != null){
            user.setPatientId(e.getPatient().getPatientId());
        }

        return user;
    }

    private UserEntity toEntity(User user){
        UserEntity e = new UserEntity();

        e.setUserName(user.getUserName());
        e.setPassword(user.getPassword());
        e.setFullName(user.getFullName());
        e.setDocument(user.getDocument());
        e.setEmail(user.getEmail());
        e.setPhone(user.getPhone());
        e.setAddress(user.getAddress());
        e.setBirthDate(user.getBirthDate());
        e.setRol(user.getRol());
        
        if(user.getPatientId() != null){
            PatientEntity patientEntity = patientRepository.findById(user.getPatientId()).orElse(null);
            e.setPatient(patientEntity);
        }

        return e;
    }
}
