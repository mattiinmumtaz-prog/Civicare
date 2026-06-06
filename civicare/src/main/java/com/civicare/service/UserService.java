package com.civicare.service;

import com.civicare.dto.*;
import com.civicare.model.User;
import java.util.List;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    User findById(Long id);
    List<User> findAll();
    void deleteUser(Long id);
}