package org.example.web.controller;

import com.sun.org.apache.xpath.internal.operations.Mod;
import org.example.backend.service.MessageService;
import org.example.backend.service.consumer.ConsumerService;
import org.example.backend.service.producer.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private ConsumerService consumerService;
    @Autowired
    private ProducerService producerService;

    @GetMapping("/send")
    public String sendMessage(Model model) {
        producerService.sendStringToActiveMQ(
                Arrays.asList(messageService.getMessage().toString(),messageService.getMessage().toString())
        );
        model.addAttribute("message", "message is on the way to ActiveMQ");
        return "index";
    }

    @GetMapping("/get")
    public String getMessage(Model model) {
        model.addAttribute("message", consumerService.getStringFromActiveMQ());
        return "index";
    }
}
