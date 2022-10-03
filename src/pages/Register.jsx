import React,{useState} from "react";
import "../style.scss";
import Add from "../img/addAvatar.png";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [err, setError]= useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

    try{

       const res = await createUserWithEmailAndPassword(auth, email, password);
    }catch(err){setError(true)}
		
			
	}

	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">Queens Chat</span>
				<span className="title">Register</span>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="display name" />
					<input type="email" placeholder="email" />
					<input type="password" placeholder="password" />
					<input style={{ display: "none" }} type="file" id="file" />
					<input style={{ display: "none" }} type="file" id="file" />
					<label htmlFor="file">
						<img src={Add} alt="" />
						<span>Add an Avatar</span>
					</label>
					<button>Sign up</button>
					"Uploading and compressing the image please wait..."
					{err && <span>Something went wrong</span>}
				</form>
				<p>You do have an account? Login</p>
			</div>
		</div>
	);
}

export default Register;
