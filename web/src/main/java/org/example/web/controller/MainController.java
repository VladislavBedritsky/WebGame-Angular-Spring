package org.example.web.controller;

import org.example.backend.model.Message;
import org.example.backend.service.MessageService;
import org.example.backend.service.consumer.ConsumerService;
import org.example.backend.service.producer.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping(value = "/", produces = {MediaType.APPLICATION_JSON_VALUE})
public class MainController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private ConsumerService consumerService;
    @Autowired
    private ProducerService producerService;

    @GetMapping("/send")
    public String sendMessage (Model model) {
        producerService.sendStringToActiveMQ(Arrays.asList(
                messageService.convertMessageToStringJSON(),
                messageService.convertMessageToStringJSON()));
        return "{\"message\":\"is on the way to queue\"}";
    }

    @GetMapping("/get")
    public String getMessages (Model model) {
        return consumerService.getStringFromActiveMQ();
    }

    @MessageMapping("/hello")
    @SendTo("/topic/activity")
    public Message greeting(Message message) {
        return new Message(message.getContent());
    }
}
