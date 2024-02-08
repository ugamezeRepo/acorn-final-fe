import { useState } from "react";
import ChatBar from "@components/ChatBar";
import ChatMessage from "@components/ChatMessage";

const ChannelMain = () => {
  const [messages, setMessage] = useState([
    { "author": "xc", "message": "xd", "sendDate": (Date.now()).toString() },
    { "author": "xc", "message": "xd", "sendDate": (Date.now()).toString() },
    { "author": "xc", "message": "xd", "sendDate": (Date.now()).toString() },
    { "author": "xc", "message": "xd", "sendDate": (Date.now()).toString() },
    { "author": "xc", "message": "xd", "sendDate": (Date.now()).toString() },
  ]);

  return (
    <div className="chatContainer">
      <div className="chatLog">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <ChatMessage author={msg.author} message={msg.message} sendDate={msg.sendDate} />
          </div>
        ))}
      </div>
      <ChatBar onSend={(newMessage) => {
        console.log(newMessage);
        setMessage([...messages, newMessage]);
      }} />
    </div>
  );
};

export default ChannelMain;