package com.civicare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civicare.dto.ApiResponse;
import com.civicare.model.Service;
import com.civicare.service.AdminServiceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final AdminServiceService adminServiceService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Service>> create(@RequestBody Service service) {
        return ResponseEntity.ok(ApiResponse.ok("Layanan ditambahkan",
                adminServiceService.create(service)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Service>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("OK", adminServiceService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Service>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", adminServiceService.getById(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Service>> update(
            @PathVariable Long id, @RequestBody Service service) {
        return ResponseEntity.ok(ApiResponse.ok("Layanan diperbarui",
                adminServiceService.update(id, service)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        adminServiceService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Layanan dihapus", null));
    }
}