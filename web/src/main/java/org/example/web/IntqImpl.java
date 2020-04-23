package org.example.web;

import org.springframework.stereotype.Service;

@Service
public class IntqImpl implements Intq {
    @Override
    public void print() {
        System.out.println("q");
    }
}
