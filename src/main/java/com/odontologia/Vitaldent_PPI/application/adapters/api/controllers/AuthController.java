package  com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.LoginRequest;
import com.odontologia.Vitaldent_PPI.application.usecases.AuthUseCase;
import com.odontologia.Vitaldent_PPI.infrastructure.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController{
    private final AuthUseCase authUseCase;
    private final JwtUtil jwtUtil;

    public AuthController(AuthUseCase authUseCase, JwtUtil jwtUtil){
        this.authUseCase = authUseCase;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        String toker = authUseCase.login(request.getUsername(), request.getPassword());
        String document = jwtUtil.extractDocument(toker);
        String role = jwtUtil.extractRole(toker);
        return ResponseEntity.ok(new LoginResponse(toker,document,role));
    }
}