package com.civicare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.civicare.dto.ApiResponse;
import com.civicare.dto.ComplaintRequest;
import com.civicare.dto.ComplaintResponse;
import com.civicare.model.ServiceStatus;
import com.civicare.service.ComplaintService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<ComplaintResponse>> create(
            @RequestParam Long userId,
            @RequestPart("data") ComplaintRequest req,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ResponseEntity.ok(ApiResponse.ok("Pengaduan berhasil dibuat",
                complaintService.create(userId, req, file)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("OK", complaintService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ComplaintResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", complaintService.getById(id)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok("OK", complaintService.getByUser(userId)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ComplaintResponse>> updateStatus(
            @PathVariable Long id, @RequestParam ServiceStatus status) {
        return ResponseEntity.ok(ApiResponse.ok("Status diperbarui",
                complaintService.updateStatus(id, status)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        complaintService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Pengaduan dihapus", null));
    }
}