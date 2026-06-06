package com.civicare.service.impl;

import com.civicare.dto.ServiceRequestDto;
import com.civicare.exception.ResourceNotFoundException;
import com.civicare.model.*;
import com.civicare.repository.*;
import com.civicare.service.ServiceRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private final ServiceRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceHistoryRepository historyRepository;

    @Override
    public ServiceRequestDto create(Long userId, Long serviceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User tidak ditemukan, id: " + userId));
        com.civicare.model.Service svc = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Layanan tidak ditemukan, id: " + serviceId));

        ServiceRequest req = ServiceRequest.builder()
                .user(user).service(svc).status(ServiceStatus.PENDING).build();
        req.createRequest();
        ServiceRequest saved = requestRepository.save(req);

        historyRepository.save(ServiceHistory.builder()
                .serviceRequest(saved).tanggal(LocalDate.now())
                .keterangan("Request dibuat, status: PENDING").build());

        return toDto(saved);
    }

    @Override
    public ServiceRequestDto getById(Long id) { return toDto(findRequest(id)); }

    @Override
    public List<ServiceRequestDto> getAll() {
        return requestRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ServiceRequestDto> getByUser(Long userId) {
        return requestRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ServiceRequestDto updateStatus(Long id, ServiceStatus status, String keterangan) {
        ServiceRequest req = findRequest(id);
        req.setStatus(status);
        requestRepository.save(req);
        historyRepository.save(ServiceHistory.builder()
                .serviceRequest(req).tanggal(LocalDate.now())
                .keterangan(keterangan != null ? keterangan : "Status diubah ke: " + status)
                .build());
        return toDto(req);
    }

    @Override
    public void delete(Long id) {
        if (!requestRepository.existsById(id))
            throw new ResourceNotFoundException("Request tidak ditemukan, id: " + id);
        requestRepository.deleteById(id);
    }

    private ServiceRequest findRequest(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request tidak ditemukan, id: " + id));
    }

    private ServiceRequestDto toDto(ServiceRequest r) {
        ServiceRequestDto dto = new ServiceRequestDto();
        dto.setId(r.getId()); dto.setUserId(r.getUser().getId());
        dto.setUserName(r.getUser().getNama()); dto.setServiceId(r.getService().getId());
        dto.setNamaLayanan(r.getService().getNamaLayanan());
        dto.setStatus(r.getStatus()); dto.setCreatedAt(r.getCreatedAt());
        return dto;
    }
}