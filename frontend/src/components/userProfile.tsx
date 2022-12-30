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
				<Avatar
					src="https://i.imgur.com/yRDb2s7.png"
					variant="circular"
					className="w-10 h-10 shadow-teal-700 shadow-sm cursor-pointer"
				></Avatar>
			</MenuHandler>
			<MenuList>
				<MenuItem onClick={handleLogout}>Logout User</MenuItem>
				<MenuItem>User Preferences</MenuItem>
				<MenuItem>Settings</MenuItem>
			</MenuList>
		</Menu>
	);
};
