package com.civicare.repository;

import com.civicare.model.Complaint;
import com.civicare.model.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);
    List<Complaint> findByStatus(ServiceStatus status);
    List<Complaint> findByUserIdOrderByCreatedAtDesc(Long userId);
}