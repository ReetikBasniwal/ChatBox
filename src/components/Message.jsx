import styles from "./Message.module.css";
import React from "react";


export default function Message() {
  return (
      <div className={styles.messageWrapper}>
          <div className={styles.messageAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1458/1458201.png"
              alt="user-pic"
            />
          </div>
          <div>
            <div style={{marginBottom:"5px"}}>
              <span className={styles.messageAuthor}>Rahul</span>
              <span className={styles.messageTime}>a minute ago</span>
            </div>
            <div className={styles.message}>
                <span className={styles.messageContent}>Hellow everyone</span>
                <div className={styles.messageLike}>
                    <button style={{ background: "transparent", border: "none" }}>
                    <img src="/" alt="likes-icon" />
                    </button>
                    <span>2</span>
                </div>
            </div>
          </div>
      </div>
  );
}
