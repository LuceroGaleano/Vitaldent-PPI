package  com.odontologia.Vitaldent_PPI.application.usecases;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.services.UpdateUser;

@Service 
public class CommonUserUseCase implements com.odontologia.Vitaldent_PPI.domain.ports.in.CommonUserUseCase{
    private UpdateUser updateUser;

    public CommonUserUseCase(UpdateUser updateUser){
        this.updateUser = updateUser;
    }

    @Override 
    public void updateUser(User user, UUID relatedId) throws BusinessException{
        updateUser.updateUser(user, relatedId);
    }
}