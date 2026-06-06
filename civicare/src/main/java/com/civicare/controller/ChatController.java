package com.civicare.controller;

import com.civicare.model.ChatMessage;
import com.civicare.repository.ChatRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final ChatRepository chatRepository;

    // KIRIM CHAT
    @PostMapping
    public ChatMessage sendMessage(
            @RequestBody ChatMessage message
    ) {
        System.out.println("CHAT MASUK: " + message.getMessage());

        return chatRepository.save(message);
    }

    // ADMIN AMBIL SEMUA CHAT
    @GetMapping
    public List<ChatMessage> getAllMessages() {

        return chatRepository.findAll();
    }

    // USER AMBIL CHAT MILIKNYA SENDIRI
    @GetMapping("/{username}")
    public List<ChatMessage> getUserMessages(
            @PathVariable String username
    ) {

        return chatRepository.findByUsername(username);
    }
}