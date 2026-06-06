package com.civicare.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComplaintRequest {
    @NotBlank private String judul;
    @NotBlank private String deskripsi;
}