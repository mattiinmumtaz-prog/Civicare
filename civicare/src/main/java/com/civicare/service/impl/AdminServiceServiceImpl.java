package com.civicare.service.impl;

import com.civicare.exception.ResourceNotFoundException;
import com.civicare.model.Service;
import com.civicare.repository.ServiceRepository;
import com.civicare.service.AdminServiceService;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class AdminServiceServiceImpl implements AdminServiceService {

    private final ServiceRepository serviceRepository;

    @Override
    public Service create(Service service) { return serviceRepository.save(service); }

    @Override
    public Service getById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Layanan tidak ditemukan, id: " + id));
    }

    @Override
    public List<Service> getAll() { return serviceRepository.findAll(); }

    @Override
    public Service update(Long id, Service updated) {
        Service existing = getById(id);
        existing.setNamaLayanan(updated.getNamaLayanan());
        existing.setDeskripsi(updated.getDeskripsi());
        existing.setTiket(updated.getTiket());
        return serviceRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!serviceRepository.existsById(id))
            throw new ResourceNotFoundException("Layanan tidak ditemukan, id: " + id);
        serviceRepository.deleteById(id);
    }
}