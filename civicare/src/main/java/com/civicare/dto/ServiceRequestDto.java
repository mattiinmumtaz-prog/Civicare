package com.civicare.dto;

import com.civicare.model.ServiceStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ServiceRequestDto {
    private Long id;
    private Long userId;
    private String userName;
    private Long serviceId;
    private String namaLayanan;
    private ServiceStatus status;
    private LocalDateTime createdAt;
}