package org.example.web.controller;

import org.example.backend.model.Message;
import org.example.backend.model.User;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/", produces = {MediaType.APPLICATION_JSON_VALUE})
public class MainController {

    @MessageMapping("/{room}")
    @SendTo("/topic/activity")
    public Message room1 (@DestinationVariable String room, Message message) {
        return new Message(message.getContent(), message.getButtonName());
    }

    @MessageMapping("/auth")
    @SendTo("/topic/activity")
    public User getUser(User user) {
        return new User(user.getName(), user.getVictory());
    }


}
