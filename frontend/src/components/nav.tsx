import React, { useEffect, useState } from "react";
import { isLoggedIn, logoutUser } from "../utils/user_api";

const Nav = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		isLoggedIn().then((res) => setLoggedIn(res));
	}, []);

	const handleLogout = (): void => {
		logoutUser().then(() => setLoggedIn(false));
	};
	return (
		<nav className="nav-component">
			{loggedIn ? (
				<button onClick={handleLogout}>logout button</button>
			) : (
				<>logged out</>
			)}
		</nav>
	);
};
export default Nav;
