package com.civicare.repository;

import com.civicare.model.ChatbotMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatbotMessageRepository extends JpaRepository<ChatbotMessage, Long> {
    List<ChatbotMessage> findByUserIdOrderBySentAtAsc(Long userId);
    List<ChatbotMessage> findAllByOrderBySentAtDesc();
}