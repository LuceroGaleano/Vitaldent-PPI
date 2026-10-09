package com.odontologia.Vitaldent_PPI.application.adapters.api.request;
import java.util.Date;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserRequest{
    @NotBlank(message = "El nombre de usuario es obligatorio")
    private String userName;

    @NotBlank(message= "La contraseña es obligatoria")
    private String password;

    @NotBlank(message = "El nombre completo es obligatorio")
    private String fullName;

    @NotBlank(message = "El numero de identificacion es obligatorio")
    private String document;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El corro debe tener un formato valido")
    private String email;

    @NotBlank(message = "El telefono es obligatorio")
    @Pattern(regexp = "^[0-9]+$", message = "El teléfono debe contener solo números")
    private String phone;

    @NotBlank(message = "La direccion es obligatoria")
    private String address;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser en pasado")
    private Date birthDate;

    @NotNull(message = "El rol es obligatorio")
    private RolUser rol;

    private UUID patientId;
}