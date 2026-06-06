package com.civicare.repository;

import com.civicare.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository
        extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByUsername(String username);
}