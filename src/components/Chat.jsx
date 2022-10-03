import React from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";

function Chat() {
	return (
		<div className="chat">
			<div className="chatInfo">
				<span>jane</span>

				<div className="chatIcons"> </div>
				<img src={Cam} alt="" />
				<img src={Add} alt="" />
				<img src={More} alt="" />
			</div>
			<Messages />
			<Input />
		</div>
	);
}

export default Chat;
