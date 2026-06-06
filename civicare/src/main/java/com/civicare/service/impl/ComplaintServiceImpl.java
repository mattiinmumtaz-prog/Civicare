package com.civicare.service.impl;

import com.civicare.dto.*;
import com.civicare.exception.*;
import com.civicare.model.*;
import com.civicare.repository.*;
import com.civicare.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Override
    public ComplaintResponse create(Long userId, ComplaintRequest req, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User tidak ditemukan, id: " + userId));

        String filePath = null;
        if (file != null && !file.isEmpty()) filePath = saveFile(file);

        Complaint complaint = Complaint.builder()
                .user(user).judul(req.getJudul())
                .deskripsi(req.getDeskripsi()).filePath(filePath)
                .status(ServiceStatus.PENDING).build();

        return toResponse(complaintRepository.save(complaint));
    }

    @Override
    public ComplaintResponse getById(Long id) {
        return toResponse(findComplaint(id));
    }

    @Override
    public List<ComplaintResponse> getAll() {
        return complaintRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<ComplaintResponse> getByUser(Long userId) {
        return complaintRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ComplaintResponse updateStatus(Long id, ServiceStatus status) {
        Complaint c = findComplaint(id);
        c.setStatus(status);
        return toResponse(complaintRepository.save(c));
    }

    @Override
    public void delete(Long id) {
        if (!complaintRepository.existsById(id))
            throw new ResourceNotFoundException("Complaint tidak ditemukan, id: " + id);
        complaintRepository.deleteById(id);
    }

    private Complaint findComplaint(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint tidak ditemukan, id: " + id));
    }

    private String saveFile(MultipartFile file) {
        try {
            Path dir = Paths.get(uploadDir);
            Files.createDirectories(dir);
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), dir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            return uploadDir + filename;
        } catch (IOException e) {
            throw new RuntimeException("Gagal menyimpan file: " + e.getMessage());
        }
    }

    private ComplaintResponse toResponse(Complaint c) {
        ComplaintResponse res = new ComplaintResponse();
        res.setId(c.getId()); res.setJudul(c.getJudul());
        res.setDeskripsi(c.getDeskripsi()); res.setFilePath(c.getFilePath());
        res.setStatus(c.getStatus()); res.setUserId(c.getUser().getId());
        res.setUserName(c.getUser().getNama());
        res.setCreatedAt(c.getCreatedAt()); res.setUpdatedAt(c.getUpdatedAt());
        return res;
    }
}