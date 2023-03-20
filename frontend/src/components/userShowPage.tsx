import {
	Avatar,
	Button,
	Card,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
} from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Post, User } from "../types";
import { addFollower, editUser, fetchCurrentUser } from "../utils/user_api";
import FollowerFollowingCard from "./followerfollowingcard";
import MiniPostCard from "./miniPostCard";

const UserProfilePage = () => {
	const { data, isFetched } = useQuery("currentUser", fetchCurrentUser);

	const [followUsername, setFollowUsername] = useState("");
	const [userData, setUserData] = useState({
		username: "",
		favorite_cuisine: "",
		id: "",
	});

	useEffect(() => {
		if (isFetched) {
			setUserData({
				username: data.username,
				favorite_cuisine: data.favorite_cuisine,
				id: data.id,
			});
		}
	}, [data]);

	const [errors, setErrors] = useState([{ field: "", message: "" }]);
	const [followsDialog, setFollowsDialog] = useState(false);
	const [editProfile, setEditProfile] = useState(false);
	const [modalType, setModalType] = useState<"followers" | "following">(
		"followers"
	);

	const handleEditUpdate = (field: string) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setUserData({ ...userData, [field]: e.target.value });
		};
	};

	const handleEditSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = await editProfileMutation.mutateAsync(userData);
		if (data.errors) {
			setErrors(data.errors);
		}

		queryClient.invalidateQueries("user");
	};
	const queryClient = useQueryClient();
	const editProfileMutation = useMutation(editUser, {
		onSuccess: () => {
			queryClient.invalidateQueries("user");
		},
	});

	const followMutation = useMutation(addFollower, {
		onSuccess: () => {
			setFollowUsername("");
			setErrors([{ field: "", message: "" }]);
			queryClient.invalidateQueries("user");
		},
	});

	const handleClick = (followerFollowing: "followers" | "following") => {
		setFollowsDialog(true);
		setModalType(followerFollowing);
	};

	const handleFollowSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = await followMutation.mutateAsync(followUsername);
		if (data.errors) {
			setErrors(data.errors);
		}
	};

	if (data) {
		return (
			<AnimatePresence>
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					className="pt-10 selection:flex flex-col justify-center w-full h-[calc(100vh+20px)] bg-teal-50"
				>
					<Link to="/home/feed">
						<IoReturnUpBack className="absolute top-5 left-7 text-2xl " />
					</Link>
					<Dialog
						// dismiss={{
						// 	outsidePointerDown: false,
						// 	escapeKey: false,
						// }}
						animate={{
							mount: {
								animation: "transition.slideUpBigIn",
								duration: 300,
							},
							unmount: {
								animation: "transition.slideDownBigOut",
								duration: 300,
							},
						}}
						open={editProfile}
						size="sm"
						handler={() => setEditProfile(!editProfile)}
					>
						<DialogHeader className="flex justify-center text-xl">
							Edit Profile
						</DialogHeader>
						<DialogBody>
							<form
								onSubmit={handleEditSubmit}
								className="flex flex-col gap-y-4"
							>
								<Input
									type="text"
									color="teal"
									size="md"
									label="change username"
									className="mb-4"
									onChange={handleEditUpdate("username")}
									value={userData.username}
								/>
								<Input
									type="text"
									color="teal"
									label="favorite cuisine"
									className="mb-4"
									onChange={handleEditUpdate("favorite_cuisine")}
									value={userData.favorite_cuisine}
									// icon={<CiForkAndKnife />}
								/>

								{errors.map((err, i) => (
									<div key={i} className="text-red-500">
										{err.message}
									</div>
								))}
							</form>
						</DialogBody>
						<DialogFooter className="flex gap-x-2">
							<Button
								color="red"
								variant="outlined"
								onClick={() => setEditProfile(!editProfile)}
								ripple={false}
								className="normal-case transition ease-in-out delay-75 hover:bg-red-500 hover:text-white duration-300 rounded-sm"
							>
								Cancel
							</Button>
							<Button
								color="teal"
								type="button"
								onClick={handleEditSubmit}
								ripple={false}
							>
								Submit
							</Button>
						</DialogFooter>
					</Dialog>
					<Card className="w-[30rem] m-auto p-5">
						<button role="button" onClick={() => setEditProfile(!editProfile)}>
							<IoIosSettings className="absolute right-3 top-[0.5rem] text-teal-600" />
						</button>
						<div className="flex flex-col justify-center m-auto">
							<Avatar
								src={data.pfpURL}
								variant="circular"
								className="w-20 h-20 shadow-teal-700 shadow-sm"
							/>
							<h1 className="text-2xl font-bold">{"@" + data.username}</h1>
						</div>
						<div className="flex flex-row gap-x-10 justify-center text-center mt-5">
							<button
								onClick={() => handleClick("followers")}
								className="cursor-pointer"
							>
								<div className="flex flex-col p-3 ">
									<h1 className="text-2xl font-bold">
										{data.followers.length}
									</h1>
									<h1 className="text-l">Followers</h1>
								</div>
							</button>

							<button
								onClick={() => handleClick("following")}
								className="cursor-pointer"
							>
								<div className="flex flex-col p-3 ">
									<h1 className="text-2xl font-bold">
										{data.following.length}
									</h1>
									<h1 className="text-l">Following</h1>
								</div>
							</button>
						</div>
					</Card>
					{/* <button
					className="flex flex-row justify-center w-full pt-2"
					onClick={handleEditProfile}
				>
					Edit Profile
				</button> */}
					<div className="flex flex-row justify-center gap-x-10 py-10">
						<div className="flex flex-col gap-y-2">
							<span className="text-center">{`${data.username}'s Top 5 Spots`}</span>
							{data.top5Spots.map((post: Post) => {
								return <MiniPostCard key={post.id} post={post} type="been" />;
							})}
						</div>
						<div className="flex flex-col gap-y-2">
							<span className="text-center">{`${data.username}'s Recent Activity`}</span>
							{data.top5Spots.map((post: Post) => {
								return <MiniPostCard key={post.id} post={post} type="been" />;
							})}
						</div>
					</div>
					<Dialog
						dismiss={{
							outsidePointerDown: false,
							escapeKey: false,
						}}
						animate={{
							mount: {
								animation: "transition.slideUpBigIn",
								duration: 300,
							},
							unmount: {
								animation: "transition.slideDownBigOut",
								duration: 300,
							},
						}}
						open={followsDialog}
						size="sm"
						handler={() => setFollowsDialog(!followsDialog)}
					>
						<DialogHeader className="text-center flex justify-center text-lg">
							{modalType === "followers" ? "Followers" : "Following"}
						</DialogHeader>
						<DialogBody className="flex flex-col gap-y-4 shrink-0">
							{modalType === "following" && (
								<form onSubmit={handleFollowSubmit}>
									{errors ? (
										<div className="flex flex-col gap-y-2">
											{errors.map((error, i) => {
												return (
													<span
														key={i}
														className="text-red-500 text-sm p-2 text-center w-[16rem]"
													>
														{error.message}
													</span>
												);
											})}
										</div>
									) : (
										""
									)}
									<div className="flex gap-x-5 mb-5 justify-center w-[22rem] m-auto">
										<Input
											type="text"
											value={followUsername}
											onChange={(e) => setFollowUsername(e.target.value)}
											label="Follower Name"
											color="teal"
											error={errors[0].message ? true : false}
										/>
										<Button
											type="submit"
											className=" normal-case rounded-xl p-6"
											size="sm"
											color="teal"
										>
											<span>Follow</span>
										</Button>
									</div>
								</form>
							)}
							{modalType === "followers"
								? data.followers.map((follower: User) => {
										return (
											<FollowerFollowingCard
												person={follower}
												key={follower.id}
											/>
										);
								  })
								: data.following.map((following: User) => {
										return (
											<FollowerFollowingCard
												person={following}
												key={following.id}
											/>
										);
								  })}
						</DialogBody>
						<DialogFooter>
							<Button
								color="red"
								variant="outlined"
								onClick={() => {
									setFollowsDialog(false);
									setErrors([{ field: "", message: "" }]);
								}}
								ripple={false}
								className="normal-case transition ease-in-out delay-75 hover:bg-red-500 hover:text-white duration-300 rounded-sm"
							>
								Close
							</Button>
						</DialogFooter>
					</Dialog>
				</motion.div>
			</AnimatePresence>
		);
	}
	return <></>;
};
export default UserProfilePage;
