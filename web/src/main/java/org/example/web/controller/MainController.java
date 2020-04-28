package org.example.web.controller;

import org.example.backend.model.AuthUser;
import org.example.backend.model.Message;
import org.example.backend.model.User;
import org.example.backend.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/", produces = {MediaType.APPLICATION_JSON_VALUE})
public class MainController {

    @Autowired
    private AuthUserService authUserService;

    @GetMapping("/user")
    public Principal getPrincipal(Principal user) {
        return user;
    }

    @GetMapping("/getUserBy/{username}")
    public AuthUser getUserByUsername(@PathVariable String username) {
        return authUserService.findAuthUserByUsername(username);
    }

    @DeleteMapping("/deleteUserBy/{username}")
    public void deleteUser(@PathVariable String username) {
        authUserService.deleteUserByUsername(username);
    }

    @PostMapping("/registration")
    public AuthUser saveUser(@RequestBody AuthUser authUser) {
        authUserService.saveAuthUser(authUser);
        return authUserService.findAuthUserByUsername(authUser.getUsername());
    }

    @MessageMapping("/hello")
    @SendTo("/topic/activity")
    public Message greeting(Message message) {
        return new Message(message.getContent(), message.getButtonName());
    }

    @MessageMapping("/auth")
    @SendTo("/topic/activity")
    public User getUser(User user) {
        return new User(user.getName(), user.getVictory());
    }
}
