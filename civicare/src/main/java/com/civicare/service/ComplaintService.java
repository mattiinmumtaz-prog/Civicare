package com.civicare.service;

import com.civicare.dto.*;
import com.civicare.model.ServiceStatus;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ComplaintService {
    ComplaintResponse create(Long userId, ComplaintRequest req, MultipartFile file);
    ComplaintResponse getById(Long id);
    List<ComplaintResponse> getAll();
    List<ComplaintResponse> getByUser(Long userId);
    ComplaintResponse updateStatus(Long id, ServiceStatus status);
    void delete(Long id);
}