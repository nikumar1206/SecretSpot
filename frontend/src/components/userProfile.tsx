import {
	Avatar,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/user_api";

export const UserProfile = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logoutUser();
		navigate("/");
		return;
	};

	const handleuserPreferences = () => {
		navigate("/user");
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
				<MenuItem onClick={handleuserPreferences}>User Preferences</MenuItem>
				<MenuItem onClick={handleLogout}>Logout User</MenuItem>
				<MenuItem>Settings</MenuItem>
			</MenuList>
		</Menu>
	);
};
