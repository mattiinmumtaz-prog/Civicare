package com.civicare.service;

import java.util.List;

import com.civicare.dto.ServiceRequestDto;
import com.civicare.model.ServiceStatus;

public interface ServiceRequestService {
    ServiceRequestDto create(Long userId, Long serviceId);
    ServiceRequestDto getById(Long id);
    List<ServiceRequestDto> getAll();
    List<ServiceRequestDto> getByUser(Long userId);
    ServiceRequestDto updateStatus(Long id, ServiceStatus status, String keterangan);
    void delete(Long id);
}