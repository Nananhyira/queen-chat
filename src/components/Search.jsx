import React from "react";
import "../style.scss"

function Search() {
	return (
		<div className="search">
			<div className="searchForm">
				<input type="text" placeholder="find a user"   />
			</div>
			<div className="userChat">
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOk-oWD03Zl6Jn4lkk1gFhZv5ckdi9dG4zNA&usqp=CAU"
					alt=""
				/>
				<div className="userChatInfo">
					<span>John</span>
				</div>
			</div>
		</div>
	);
}

export default Search;
