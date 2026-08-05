import React, { useContext, useState } from "react";
import "../style.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	const handleSearch = async () => {
		if (!searchTerm.trim()) return setResults([]);

		try {
			const q = query(
				collection(db, "users"),
				where("searchName", "==", searchTerm.toLowerCase())
			);
			const querySnapshot = await getDocs(q);
			const users = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				if (data.uid !== currentUser?.uid) users.push(data);
			});
			setResults(users);
		} catch (err) {
			console.error("Search failed", err);
			setResults([]);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSearch();
		}
	};

	const handleSelect = (user) => {
		dispatch({ type: "CHANGE_USER", payload: user });
		setResults([]);
		setSearchTerm("");
	};

	return (
		<div className="search">
			<div className="searchForm">
				<input
					type="text"
					placeholder="Find a user (exact display name)"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>

			<div className="searchResults">
				{results.length === 0 && searchTerm && <div className="empty">No users found.</div>}
				{results.map((user) => (
					<div className="userChat" key={user.uid} onClick={() => handleSelect(user)}>
					<img src={user.photoURL || "/img/addAvatar.png"} alt="avatar" />
						<div className="userChatInfo">
							<span>{user.displayName}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Search;
