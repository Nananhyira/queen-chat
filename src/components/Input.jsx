import React from "react";
import img from "../img/img.png";
import Attach from "../img/attach.png";

function Input() {
	return (
		<div className="input">
			<input type="text" placeholder="Type something..." />
			<div className="send">
				<img src={Attach} alt="" />
				<input type="file" style={{ display: "none" }} id="file" />
				<label htmlFor="file">
					<img src={img} alt="" />
				</label>
				<button>Send</button>
			</div>
		</div>
	);
}

export default Input;
