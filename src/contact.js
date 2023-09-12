import React, { useState } from 'react';
import './contact.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const sendMessage = (message) => {
    const newMessage = { content: message, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const botResponse = generateBotResponse();
    setTimeout(() => {
      const botMessage = { content: botResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);
  };

  const generateBotResponse = () => {
    // Replace this with your own bot logic
    const responses = [
      "Hello, how can I assist you?",
      "What can I help you with today?",
      "I'm here to answer your questions. Ask me anything!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="chat-bot-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Chat Bot</h1>
        </div>
        <div className="sidebar-menu"></div>
      </div>
      <div className="chat-area">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">➣</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
