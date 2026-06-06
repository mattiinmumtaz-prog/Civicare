package com.civicare.dto;

import com.civicare.model.ServiceStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ComplaintResponse {
    private Long id;
    private String judul;
    private String deskripsi;
    private String filePath;
    private ServiceStatus status;
    private Long userId;
    private String userName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}