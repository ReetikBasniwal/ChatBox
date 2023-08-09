import '../App.css';
import React, { useState } from 'react';
// import ScrollView from 'react-inverted-scrollview';
import Message from './Message';
function App() {

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('');

  const users = ["Alan", "Bob", "Carol", "Dean", "Elin"]; // USERS

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const randomUserName = users[Math.floor(Math.random() * users.length)];
    const newMessageObj = { text: newMessage, userName: randomUserName };

    // setMessages([...messages, newMessageObj]);
    setMessages([newMessageObj, ...messages]);
    setNewMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      // Prevent the default behavior (creating a new line)
      event.preventDefault();
  
      // Manually insert a newline character
      setNewMessage(newMessage + '\n');
    }else if (event.key === 'Enter') {
      event.preventDefault(); // Prevent Enter from creating a new line
      handleSend(); // Call handleSend when Enter key is pressed
    }
  };

  return (
    <div className="App">
      {/* MAIN CHAT BOX */}
      <div className="chatbox">
        {/* TOP GROUP NAME */}
        <div className="topUserName">
          <h2 style={{ color: "white" }}>Homies</h2>
          <span>This group is for my loved ones</span>
        </div>

        {/* CHATS */}
        <div className="chats">
          {messages.map((msg, index) => {
            return <Message key={index} msg={msg} />
          })}
        </div>

        {/* INPUT DIV */}
        <div className="inputDiv">
          <div className="inputIcon">
            <i className="fa-regular fa-face-smile"></i>
          </div>
          <textarea rows="1" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder='Type Message...' ></textarea>
          <div className="sendIcon" onClick={handleSend} >
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;