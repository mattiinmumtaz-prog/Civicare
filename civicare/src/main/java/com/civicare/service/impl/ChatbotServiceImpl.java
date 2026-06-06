package com.civicare.service.impl;

import com.civicare.dto.ChatMessageResponse;
import com.civicare.exception.ResourceNotFoundException;
import com.civicare.model.*;
import com.civicare.repository.*;
import com.civicare.service.ChatbotService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatbotServiceImpl implements ChatbotService {

    private final ChatbotMessageRepository chatRepo;
    private final UserRepository userRepository;

    // =========================
    // USER → AI CHATBOT
    // =========================
    @Override
    public ChatMessageResponse userSendMessage(
            Long userId,
            String message
    ) {

        User user = findUser(userId);

        // SIMPAN PESAN USER
        chatRepo.save(
                ChatbotMessage.builder()
                        .user(user)
                        .sender(SenderType.USER)
                        .message(message)
                        .build()
        );

        // RESPONSE AI
        String botReply = generateBotReply(message);

        // SIMPAN RESPONSE AI
        ChatbotMessage botMsg =
                chatRepo.save(
                        ChatbotMessage.builder()
                                .user(user)
                                .sender(SenderType.BOT)
                                .message(botReply)
                                .build()
                );

        return toResponse(botMsg);
    }

    // =========================
    // ADMIN → USER
    // =========================
    @Override
    public ChatMessageResponse adminReply(
            Long userId,
            String message
    ) {

        User user = findUser(userId);

        ChatbotMessage adminMsg =
                chatRepo.save(
                        ChatbotMessage.builder()
                                .user(user)
                                .sender(SenderType.ADMIN)
                                .message(message)
                                .build()
                );

        return toResponse(adminMsg);
    }

    // =========================
    // AMBIL CHAT USER
    // =========================
    @Override
    public List<ChatMessageResponse> getConversation(
            Long userId
    ) {

        return chatRepo
                .findByUserIdOrderBySentAtAsc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // AMBIL SEMUA CHAT
    // =========================
    @Override
    public List<ChatMessageResponse> getAllConversations() {

        return chatRepo
                .findAllByOrderBySentAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // AI OPENROUTER
    // =========================
    private String generateBotReply(String message) {

        try {

            RestTemplate restTemplate =
                    new RestTemplate();

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            // ====================================
            // API KEY OPENROUTER
            // TANPA "Bearer"
            // ====================================
            headers.setBearerAuth(
                    ""
            );

            headers.add(
                    "HTTP-Referer",
                    "http://localhost:5173"
            );

            headers.add(
                    "X-Title",
                    "CiviCare AI"
            );

            Map<String, Object> body =
                    new HashMap<>();

            // ====================================
            // MODEL AI GRATIS
            // ====================================
            body.put(
                    "model",
                    "llama-3.1-8b-instant"
            );

            List<Map<String, String>> messages =
                    new ArrayList<>();

            // SYSTEM PROMPT
            Map<String, String> system =
                    new HashMap<>();

            system.put("role", "system");

            system.put(
                    "content",
                    "Kamu adalah AI Assistant aplikasi CiviCare yang membantu masyarakat dengan ramah, profesional, singkat, dan jelas."
            );

            // USER MESSAGE
            Map<String, String> user =
                    new HashMap<>();

            user.put("role", "user");
            user.put("content", message);

            messages.add(system);
            messages.add(user);

            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

            // DEBUG RESPONSE
            System.out.println(response.getBody());

            Map result =
                    (Map) ((List) response
                            .getBody()
                            .get("choices"))
                            .get(0);

            Map aiMessage =
                    (Map) result.get("message");

            return aiMessage
                    .get("content")
                    .toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR AI: " + e.getMessage();
        }
    }

    // =========================
    // CARI USER
    // =========================
    private User findUser(Long userId) {

        return userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User tidak ditemukan, id: " + userId
                        )
                );
    }

    // =========================
    // CONVERT RESPONSE
    // =========================
    private ChatMessageResponse toResponse(
            ChatbotMessage m
    ) {

        ChatMessageResponse res =
                new ChatMessageResponse();

        res.setId(m.getId());

        res.setUserId(
                m.getUser().getId()
        );

        res.setUserName(
                m.getUser().getNama()
        );

        res.setSender(
                m.getSender()
        );

        res.setMessage(
                m.getMessage()
        );

        res.setSentAt(
                m.getSentAt()
        );

        return res;
    }
}