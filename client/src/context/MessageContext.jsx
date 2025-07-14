// src/context/MessageContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import messageService from "../services/messageService";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");
  
  const fetchMessages = async () => {
    try {
      const res = await messageService.getMessages();
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  
  useEffect(() => {
    if (token) fetchMessages();
  }, [token])

  return (
    <MessageContext.Provider value={{ messages, setMessages, fetchMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
