import styles from "./Message.module.css";
import React, { useState } from "react";

const Message = React.memo((props)  => {
  const [isLiked, setIsLiked] = useState(false);
  let [likes, setLikes] = useState(Math.floor(Math.random() * 5)+1);
  console.log(likes)
  const messageLines = props.msg.text.split('\n');


  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(likes + 1);
      return;
    } else {
      setIsLiked(false);
      setLikes(likes - 1);
      return;
    }
  };

  const userBackgroundColor = props.userBgColors[props.msg.userName] || "gray";

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.messageAvatar}>
        <div style={{ backgroundColor: userBackgroundColor }}>
          <p style={{ fontSize: "26px", color: "white" }}>
            {props.msg.userName[0]}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ margin: "8px 0" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              marginRight: "10px",
            }}
          >
            {props.msg.userName}
          </span>
          <span style={{ color: "gray" }}>{props.msg.timeStamp}</span>
        </div>
        <div className={styles.message}>
          {messageLines.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
        <div className={styles.messageLike}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "0%",
            }}
            onClick={handleLike}
          >
            <i
              style={{
                fontSize: "15px",
                cursor: "pointer",
                color: isLiked ? "red" : "#d1d1d1",
              }}
              className="fa-solid fa-heart"
            ></i>
          </button>
          <span style={{ marginLeft: likes > 1 ? "5px" : "0", color: "gray" }}>
            {likes > 1 ? `${likes}` : null}
          </span>
        </div>
      </div>
    </div>
  );
})

export default Message;
