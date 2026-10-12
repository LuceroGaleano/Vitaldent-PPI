package com.odontologia.Vitaldent_PPI.domain.ports.in;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;

public interface CommonUserUseCase{
    void updateUser(User user, UUID relatedId) throws BusinessException;
}