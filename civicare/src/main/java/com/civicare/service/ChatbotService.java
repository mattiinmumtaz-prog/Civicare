package com.civicare.service;

import java.util.List;

import com.civicare.dto.ChatMessageResponse;

public interface ChatbotService {
    ChatMessageResponse userSendMessage(Long userId, String message);
    ChatMessageResponse adminReply(Long userId, String message);
    List<ChatMessageResponse> getConversation(Long userId);
    List<ChatMessageResponse> getAllConversations();
}