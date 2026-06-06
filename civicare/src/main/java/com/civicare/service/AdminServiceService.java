package com.civicare.service;

import java.util.List;

import com.civicare.model.Service;

public interface AdminServiceService {
    Service create(Service service);
    Service getById(Long id);
    List<Service> getAll();
    Service update(Long id, Service service);
    void delete(Long id);
}