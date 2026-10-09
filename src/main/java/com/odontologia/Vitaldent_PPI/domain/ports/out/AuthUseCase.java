package  com.odontologia.Vitaldent_PPI.domain.ports.out;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;

public interface AuthUseCase{
    String login(String username, String password) throws BusinessException;
}