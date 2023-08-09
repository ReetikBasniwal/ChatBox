import '../App.css';
import React, { useState } from 'react';
import Message from './Message';

import EmojiPicker from 'emoji-picker-react';

function App() {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

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
      // Not to be done anything
    }else if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    } else if(event.key === '@'){
      setShowMentions(true);
    }
  };

  const onEmojiClick = (emojiObject, e) => {
    const emoji = emojiObject.emoji;
    console.log(emoji)
    setNewMessage(newMessage +" "+emoji); 
    setShowEmoji(false);
  }
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

        {/* MENTION */}
        {showMentions && (
          <div className="userMentionsDiv">
            {users.map((user, index) => (
              <div className="usersToMention" key={index}>
                @{user}
              </div>
            ))}
          </div>
        )}
        
        {/* INPUT DIV */}
        <div className="inputDiv">
          {/* EMOJI */}
          {showEmoji && (
            <div className='emojiPicker'>
              <EmojiPicker onEmojiClick={onEmojiClick}/>
            </div>)}
          <div className="inputIcon" onClick={() => setShowEmoji(!showEmoji)}>
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