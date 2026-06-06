package com.civicare.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.civicare.config.JwtUtil;
import com.civicare.dto.AuthResponse;
import com.civicare.dto.LoginRequest;
import com.civicare.dto.RegisterRequest;
import com.civicare.exception.BadRequestException;
import com.civicare.exception.ResourceNotFoundException;
import com.civicare.model.User;
import com.civicare.repository.UserRepository;
import com.civicare.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new BadRequestException("Email sudah terdaftar: " + req.getEmail());

        User user = new User(req.getNama(), req.getEmail(),
                passwordEncoder.encode(req.getPassword()), req.getRole());
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(user.getId(), token, user.getEmail(), user.getNama(), user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new BadRequestException("Email atau password salah"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new BadRequestException("Email atau password salah");

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(user.getId(), token, user.getEmail(), user.getNama(), user.getRole().name());
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User tidak ditemukan, id: " + id));
    }

    @Override
    public List<User> findAll() { return userRepository.findAll(); }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id))
            throw new ResourceNotFoundException("User tidak ditemukan, id: " + id);
        userRepository.deleteById(id);
    }
}