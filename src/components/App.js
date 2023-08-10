import './App.css';
import { FiUsers } from 'react-icons/fi'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import React, { useState } from 'react';
import Message from './Message';

import EmojiPicker from 'emoji-picker-react';

function App() {

  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const users = ["Alan", "Bob", "Carol", "Dean", "Elin"]; // USERS

  const handleSend = () => {
    if (newMessageText.trim() === '') return;
    const randomUserName = users[Math.floor(Math.random() * users.length)];
    const date = new Date();
    const desiredTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    const newMessageTextObj = { text: newMessageText, userName: randomUserName, timeStamp: desiredTime };

    setMessages([newMessageTextObj, ...messages]);
    setNewMessageText('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      // Not to be done anything
      setShowMentions(false);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }else {
      setShowMentions(false);
    }
  };

  const onEmojiClick = (emojiObject, e) => {
    const emoji = emojiObject.emoji;
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = newMessageText.substring(0, start) + emoji + newMessageText.substring(end);
    setNewMessageText(newText);
    setShowEmoji(false);
  }

  const handleMention = (user) => {
    const textarea = document.querySelector('textarea');
    const curr = textarea.selectionStart;
    let newText = newMessageText.substring(0, curr) + user;
    setNewMessageText(newText); 
    setShowMentions(false);
  }

  const handleInputChange = (e) => {
    setNewMessageText(e.target.value);

    if (e.target.value.endsWith('@') || e.target.value.endsWith('@ ')) {
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  // USER COLORS
  const userColors = {
    Alan: "green",
    Bob: "red",
    Carol: "blue",
    Dean: "purple",
    Elin: "orange",
  };

  return (
    <div className="App">
      {/* MAIN CHAT BOX */}
      <div className="chatbox">
        {/* TOP GROUP NAME */}
        <div className="topUserName">
          <h2 style={{ color: "white" }}>Homies</h2>
          <span>This group is for my loved ones</span>

          <span style={{position:"absolute", right:"10%", top:"30%", marginRight:"2%"}}>3/100</span>
          <button><FiUsers /></button>

        </div>

        {/* CHATS */}
        <div className="chats">
          {messages.map((msg, index) => {
            return <Message key={index} msg={msg} userBgColors={userColors} />
          })}
        </div>

        {/* MENTION */}
        {showMentions && (
          <div className="userMentionsDiv">
            {users.map((user, index) => (

              <div className="userToMention" key={index} onClick={() => handleMention(user)}>
                <div>
                  <div className="userIcon" style={{ backgroundColor: userColors[user] }}>
                    <p style={{ fontSize: "20px", color: "white" }}>
                      {user[0]}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#fff",
                      marginRight: "10px",
                    }}
                  >
                    {user}
                  </span>
                </div>
              </div>

            ))}
          </div>
        )}

        {/* INPUT DIV */}
        <div className="inputDiv">
          {/* EMOJI */}
          {showEmoji && (
            <div className='emojiPicker'>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>)}
          <div className="inputIcon" onClick={() => setShowEmoji(!showEmoji)}>
            <HiOutlineEmojiHappy />
          </div>
          <textarea rows="1" value={newMessageText} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Type Message...' ></textarea>
          <div className="sendIcon" onClick={handleSend}>
            <RiSendPlane2Fill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;