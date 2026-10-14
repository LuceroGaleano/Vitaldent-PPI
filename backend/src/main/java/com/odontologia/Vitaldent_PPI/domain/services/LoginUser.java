package  com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;
import com.odontologia.Vitaldent_PPI.infrastructure.security.JwtUtil;

@Service
public class LoginUser {
    private final UserPort userPort;
    private final JwtUtil jwtUtil;

    public LoginUser(UserPort userPort, JwtUtil jwtUtil){
        this.userPort = userPort;
        this.jwtUtil = jwtUtil;
    }

    public String excute(String userName, String password)throws BusinessException{
        User user = userPort.findByUserName(userName);
        if(user == null){
            throw new BusinessException("Haz ingresado mal un dato");
        }

        if(!password.equals(user.getPassword())){
            throw new BusinessException("Haz ingresado mal un dato");
        }
        return jwtUtil.generateToken(user.getDocument(), user.getUserName(), user.getRol().toString());
    }
}
