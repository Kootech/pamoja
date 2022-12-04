import React, { useState, useEffect, useRef } from "react";
import ChatFooter from "../components/ChatFooter";
import ChatBody from "../components/ChatBody";
import ChatHeader from "../components/ChatHeader";

import { socket } from "../services/socket";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("response", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <ChatHeader socket={socket} />
      <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
      <ChatFooter socket={socket} />
    </div>
  );
};

export default GroupChat;
