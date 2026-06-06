package com.civicare.repository;

import com.civicare.model.ServiceRequest;
import com.civicare.model.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByUserId(Long userId);
    List<ServiceRequest> findByStatus(ServiceStatus status);
    List<ServiceRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
}