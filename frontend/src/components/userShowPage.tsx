import { Avatar, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { addFollower, fetchCurrentUser } from "../utils/user_api";

const UserProfilePage = () => {
	const { data, isFetched } = useQuery("user", fetchCurrentUser);

	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState([{ message: "" }]);

	const handleEditProfile = () => {
		console.log("edit profile");
	};

	const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = await addFollower(username);
		if (data.errors) {
			return setErrors(data.errors);
		} else {
			return console.log("success");
		}
	};

	if (isFetched) {
		return (
			<div className="pt-20 selection:flex flex-col items-center w-full h-screen bg-teal-50">
				<div className="flex flex-col items-center w-full">
					<Avatar
						src={data.pfpURL}
						variant="circular"
						className="w-20 h-20 shadow-teal-700 shadow-sm cursor-pointer"
					/>
					<h1 className="text-2xl font-bold">{"@" + data.username}</h1>
				</div>
				<div className="flex flex-row gap-x-10 justify-center text-center mt-5">
					<div className="flex flex-col">
						<h1 className="text-2xl font-bold">{2}</h1>
						<h1 className="text-l">Followers</h1>
					</div>
					<div className="flex flex-col">
						<h1 className="text-2xl font-bold">{1}</h1>
						<h1 className="text-l">Following</h1>
					</div>
				</div>
				<button
					className="flex flex-row justify-center w-full pt-2"
					onClick={handleEditProfile}
				>
					Edit Profile
				</button>

				<form onSubmit={handleSubmit}>
					<input type="text" value={username} onChange={handleUpdate} />
					<Button type="submit" className="border-2 border-black">
						Follow User
					</Button>
				</form>
			</div>
		);
	}
	return <></>;
};
export default UserProfilePage;
