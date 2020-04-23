package org.example.backend.model;

import java.util.Objects;

public class ChatMessage {
    private String content;
    private String author;
    private MessageType messageType;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatMessage that = (ChatMessage) o;
        return Objects.equals(content, that.content) &&
                Objects.equals(author, that.author) &&
                messageType == that.messageType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(content, author, messageType);
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", messageType=" + messageType +
                '}';
    }
}
