package  com.odontologia.Vitaldent_PPI.application.usecases;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.services.LoginUser;

public class AuthUseCase implements com.odontologia.Vitaldent_PPI.domain.ports.out.AuthUseCase{
    private final LoginUser loginUser;

    public AuthUseCase(LoginUser loginUser){
        this.loginUser = loginUser;
    }

    @Override 
    public String login(String username, String password) throws BusinessException{
        return loginUser.excute(username, password);
    }
}