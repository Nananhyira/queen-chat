import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate("/login");
		} catch (err) {
			console.error("Logout failed", err);
		}
	};

	return (
		<div className="navbar">
			<span className="logo">Queens Chat</span>
			<div className="user">
				{currentUser ? (
					<>
						<Link to="/profile">
							<img src={currentUser.photoURL || "/img/addAvatar.png"} alt={currentUser.displayName || currentUser.email} />
						</Link>
						<span>{currentUser.displayName || currentUser.email}</span>
						<button onClick={handleLogout}>Logout</button>
					</>
				) : (
					<>
						<img src="/img/addAvatar.png" alt="guest" />
						<span>Guest</span>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
