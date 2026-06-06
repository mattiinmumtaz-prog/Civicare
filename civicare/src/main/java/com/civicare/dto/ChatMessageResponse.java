package com.civicare.dto;

import com.civicare.model.SenderType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessageResponse {
    private Long id;
    private Long userId;
    private String userName;
    private SenderType sender;
    private String message;
    private LocalDateTime sentAt;
}