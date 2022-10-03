import React from "react";

function Navbar() {
	return (
		<div className="navbar">
			<span className="logo">Queens Chat </span>
			<div className="user">
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOk-oWD03Zl6Jn4lkk1gFhZv5ckdi9dG4zNA&usqp=CAU"
					alt=""
				/>
				<span>John</span>
				<button>Logout</button>
			</div>
		</div>
	);
}

export default Navbar;
