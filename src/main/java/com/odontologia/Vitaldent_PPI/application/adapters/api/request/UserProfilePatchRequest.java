package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.util.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfilePatchRequest {
    @Pattern(regexp = ".*\\S.*", message = "El nombre de usuario no puede estar vacío")
    private String userName;

    @Pattern(regexp = ".*\\S.*", message = "La contraseña no puede estar vacía")
    private String password;

    @Pattern(regexp = ".*\\S.*", message = "El nombre completo no puede estar vacío")
    private String fullName;

    @Email(message = "El correo debe tener un formato válido")
    private String email;

    @Pattern(regexp = "^[0-9]+$", message = "El teléfono debe contener solo números")
    private String phone;

    @Pattern(regexp = ".*\\S.*", message = "La dirección no puede estar vacía")
    private String address;

    @Past(message = "La fecha de nacimiento debe ser en pasado")
    private Date birthDate;
}
