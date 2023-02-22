import { Avatar, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Post, User } from "../types";
import { addFollower, fetchCurrentUser } from "../utils/user_api";
import MiniPostCard from "./miniPostCard";

const UserProfilePage = () => {
	const data: User = useQuery("user", fetchCurrentUser).data;

	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState([{ message: "" }]);

	const handleEditProfile = () => {};

	const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = await addFollower(username);
		if (data.errors) {
			return setErrors(data.errors);
		}
	};

	if (data) {
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

				{errors.map((error, i) => {
					return <p key={i}>{error.message}</p>;
				})}
				<form onSubmit={handleSubmit}>
					<input type="text" value={username} onChange={handleUpdate} />
					<Button type="submit" className="border-2 border-black">
						Follow User
					</Button>
				</form>

				<ul>
					{data.followers.map((follower: User) => {
						return <li key={follower.id}>Follower: {follower.username}</li>;
					})}
				</ul>

				<ul>
					{data.following.map((following: User) => {
						return <li key={following.id}>following: {following.username}</li>;
					})}
				</ul>

				<div>
					<span>{`${data.username}'s top 5 spots`}</span>
					<div className="flex flex-col gap-y-2">
						{data.top5Spots.map((post: Post) => {
							return <MiniPostCard key={post.id} post={post} type="been" />;
						})}
					</div>
				</div>
			</div>
		);
	}
	return <></>;
};
export default UserProfilePage;
