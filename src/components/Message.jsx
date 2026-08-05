import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (!message) return null;

  const isOwner = currentUser?.uid && message.senderId === currentUser.uid;

  return (
    <div ref={ref} className={`message ${isOwner && "owner"}`}>
      <div className="messageInfo">
        <img
          src={isOwner ? currentUser?.photoURL || "" : data?.user?.photoURL || ""}
          alt="user avatar"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="attached" />}
      </div>
    </div>
  );
};

export default Message;
