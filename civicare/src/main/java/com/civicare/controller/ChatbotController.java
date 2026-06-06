package com.civicare.controller;

import com.civicare.dto.*;
import com.civicare.service.ChatbotService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatbotController {

    private final ChatbotService chatbotService;

    // =========================
    // USER → AI CHATBOT
    // =========================
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<ChatMessageResponse>> send(

            @RequestParam Long userId,

            @Valid @RequestBody ChatMessageRequest req
    ) {

        return ResponseEntity.ok(

                ApiResponse.ok(

                        "Pesan terkirim",

                        chatbotService.userSendMessage(
                                userId,
                                req.getMessage()
                        )
                )
        );
    }

    // =========================
    // ADMIN → USER
    // =========================
    @PostMapping("/admin/reply/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ChatMessageResponse>>
    adminReply(

            @PathVariable Long userId,

            @Valid @RequestBody ChatMessageRequest req
    ) {

        return ResponseEntity.ok(

                ApiResponse.ok(

                        "Balasan terkirim",

                        chatbotService.adminReply(
                                userId,
                                req.getMessage()
                        )
                )
        );
    }

    // =========================
    // AMBIL SEMUA CHAT
    // =========================
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>>
    getAllConversations() {

        return ResponseEntity.ok(

                ApiResponse.ok(

                        "OK",

                        chatbotService.getAllConversations()
                )
        );
    }

    // =========================
    // AMBIL CHAT USER
    // =========================
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>>
    getConversation(

            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(

                ApiResponse.ok(

                        "OK",

                        chatbotService.getConversation(userId)
                )
        );
    }
}