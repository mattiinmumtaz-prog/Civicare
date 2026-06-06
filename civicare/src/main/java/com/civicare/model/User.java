package com.civicare.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends AbstractUser {

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Complaint> complaints = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceRequest> serviceRequests = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatbotMessage> chatMessages = new ArrayList<>();

    public User(String nama, String email, String password, Role role) {
        super(null, nama, email, password, role);
    }

    @Override
    public String getDescription() {
        return switch (getRole()) {
            case ADMIN      -> "Admin – dapat mengelola seluruh layanan";
            case MASYARAKAT -> "Masyarakat – dapat mengajukan pengaduan & request layanan";
            case KARYAWAN   -> "Karyawan – petugas pelaksana layanan";
        };
    }
}