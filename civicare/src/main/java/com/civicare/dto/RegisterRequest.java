package com.civicare.dto;

import com.civicare.model.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank private String nama;
    @Email @NotBlank private String email;
    @NotBlank @Size(min = 6) private String password;
    private Role role = Role.MASYARAKAT;
}