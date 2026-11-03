package  com.odontologia.Vitaldent_PPI.application.usecases;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.services.FindUser;
import com.odontologia.Vitaldent_PPI.domain.services.UpdateUser;

@Service 
public class CommonUserUseCase implements com.odontologia.Vitaldent_PPI.domain.ports.in.CommonUserUseCase{
    private UpdateUser updateUser;
    private FindUser findUser;

    public CommonUserUseCase(UpdateUser updateUser, FindUser findUser){
        this.updateUser = updateUser;
        this.findUser = findUser;
    }

    @Override 
    public void updateUser(User user, UUID relatedId) throws BusinessException{
        updateUser.updateUser(user, relatedId);
    }
    
    @Override 
    public User findUserByDocument(String document) throws NotFoundException{
        return findUser.findUserByDocument(document);
    }
}