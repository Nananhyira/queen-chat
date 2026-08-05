import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";

function Messages() {
	const [messages, setMessages] = useState([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		if (!data?.chatId) {
			setMessages([]);
			return;
		}

		const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
			if (doc.exists()) {
				setMessages(doc.data().messages || []);
			} else {
				setMessages([]);
			}
		});

		return () => unsub();
	}, [data.chatId]);

	return (
		<div className="messages">
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
}

export default Messages;
