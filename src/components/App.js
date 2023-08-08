import '../App.css';
import React, { useState } from 'react';
import Message from './Message';
function App() {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };


  return (
    <div className="App">
      {/* MAIN CHAT BOX */}
      <div className="chatbox">
        {/* TOP GROUP NAME */}
        <div className="topUserName">
          <h2>Homies</h2>
          <span>This group is for my loved ones</span>
        </div>

        {/* CHATS */}
        <div className="chats">
          <Message />
        </div>

        {/* INPUT DIV */}
        <div className="inputDiv">
          <input type="text" placeholder='Type Message...'/>
        </div>
      </div>
    </div>
  );
}

export default App;
