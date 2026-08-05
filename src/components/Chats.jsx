import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState({});
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data() || {});
        },
        (err) => {
          console.error(err);
          setError(err.message || err.code || "Failed to load chats.");
        }
      );

      return () => unsub();
    };

    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const chatEntries = Object.entries(chats || {});

  return (
    <div className="chats">
      {error && <div className="error">{error}</div>}
      {chatEntries.length === 0 && <div className="empty">No chats yet.</div>}
      {chatEntries
        .sort((a, b) => (b[1]?.date?.seconds || 0) - (a[1]?.date?.seconds || 0))
        .map((chat) => {
          const chatData = chat[1] || {};
          const userInfo = chatData.userInfo || {};

          if (!userInfo.uid) {
            return null;
          }

          return (
            <div className="userChat" key={chat[0]} onClick={() => handleSelect(userInfo)}>
              <img src={userInfo.photoURL || ""} alt="user avatar" />
              <div className="userChatInfo">
                <span>{userInfo.displayName || "Unknown user"}</span>
                <p>{chatData.lastMessage?.text || "No messages yet."}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
