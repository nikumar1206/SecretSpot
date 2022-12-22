import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
} from "@material-tailwind/react";
import { isAuthed, logoutUser } from "../utils/user_api";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logoutUser();
		isAuthed().then((res) => console.log(res));
		navigate("/");
		return;
	};

	return (
		<Menu>
			<MenuHandler>
				<Avatar src="https://i.imgur.com/yRDb2s7.png"></Avatar>
			</MenuHandler>
			<MenuList>
				<MenuItem onClick={handleLogout}>Logout User</MenuItem>
				<MenuItem>User Preferences</MenuItem>
				<MenuItem>Settings</MenuItem>
			</MenuList>
		</Menu>
	);
};
