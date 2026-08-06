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

  const getMessageDate = () => {
    if (!message.date) return null;
    if (message.date.toDate) return message.date.toDate();
    return new Date(message.date);
  };

  const formatTime = (date) => {
    if (!date) return "";
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat(undefined, options).format(date);
  };

  const date = getMessageDate();
  const ageMs = date ? Date.now() - date.getTime() : 0;
  const timestampLabel = date
    ? ageMs > 3 * 60 * 1000
      ? formatTime(date)
      : "just now"
    : "";

  return (
    <div ref={ref} className={`message ${isOwner ? "owner" : ""}`}>
      <div className="messageInfo">
        <img
          src={isOwner ? currentUser?.photoURL || "" : data?.user?.photoURL || ""}
          alt="user avatar"
        />
        <span>{timestampLabel}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="attached" />}
      </div>
    </div>
  );
};

export default Message;
