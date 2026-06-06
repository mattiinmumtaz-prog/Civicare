package com.civicare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.civicare.dto.ApiResponse;
import com.civicare.dto.ServiceRequestDto;
import com.civicare.model.ServiceStatus;
import com.civicare.service.ServiceRequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class ServiceRequestController {

    private final ServiceRequestService requestService;

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceRequestDto>> create(
            @RequestParam Long userId, @RequestParam Long serviceId) {
        return ResponseEntity.ok(ApiResponse.ok("Request berhasil dibuat",
                requestService.create(userId, serviceId)));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ServiceRequestDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("OK", requestService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceRequestDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", requestService.getById(id)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ServiceRequestDto>>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("OK", requestService.getByUser(userId)));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ServiceRequestDto>> updateStatus(
            @PathVariable Long id,
            @RequestParam ServiceStatus status,
            @RequestParam(required = false) String keterangan) {
        return ResponseEntity.ok(ApiResponse.ok("Status diperbarui",
                requestService.updateStatus(id, status, keterangan)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        requestService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Request dihapus", null));
    }
}