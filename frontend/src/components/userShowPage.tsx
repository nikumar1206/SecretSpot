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
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Post, User } from "../types";
import { addFollower, fetchCurrentUser } from "../utils/user_api";
import FollowerFollowingCard from "./followerfollowingcard";
import MiniPostCard from "./miniPostCard";

const UserProfilePage = () => {
	const data: User = useQuery("user", fetchCurrentUser).data;
	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState([{ field: "", message: "" }]);
	const [followsDialog, setFollowsDialog] = useState(false);
	const [modalType, setModalType] = useState<"followers" | "following">(
		"followers"
	);

	const handleEditProfile = () => {};
	const queryClient = useQueryClient();
	const followMutation = useMutation(addFollower, {
		onSuccess: () => {
			setUsername("");
			setErrors([{ field: "", message: "" }]);
			queryClient.invalidateQueries("user");
		},
	});

	const handleClick = (followerFollowing: "followers" | "following") => {
		setFollowsDialog(true);
		setModalType(followerFollowing);
	};
	const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = await followMutation.mutateAsync(username);
		if (data.errors) {
			setErrors(data.errors);
		}
	};

	if (data) {
		return (
			<div className="pt-10 selection:flex flex-col justify-center w-full h-[calc(100vh+20px)] bg-teal-50">
				<Card className="w-[30rem] m-auto p-5">
					<div className="flex flex-col justify-center m-auto">
						<Avatar
							src={data.pfpURL}
							variant="circular"
							className="w-20 h-20 shadow-teal-700 shadow-sm cursor-pointer"
						/>
						<h1 className="text-2xl font-bold">{"@" + data.username}</h1>
					</div>
					<div className="flex flex-row gap-x-10 justify-center text-center mt-5">
						<button
							onClick={() => handleClick("followers")}
							className="cursor-pointer"
						>
							<div className="flex flex-col p-3 ">
								<h1 className="text-2xl font-bold">{data.followers.length}</h1>
								<h1 className="text-l">Followers</h1>
							</div>
						</button>

						<button
							onClick={() => handleClick("following")}
							className="cursor-pointer"
						>
							<div className="flex flex-col p-3 ">
								<h1 className="text-2xl font-bold">{data.following.length}</h1>
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
							<form onSubmit={handleSubmit}>
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
										value={username}
										onChange={handleUpdate}
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
							onClick={() => {
								setFollowsDialog(false);
								setErrors([{ field: "", message: "" }]);
							}}
							ripple={false}
						>
							Close
						</Button>
					</DialogFooter>
				</Dialog>
			</div>
		);
	}
	return <></>;
};
export default UserProfilePage;
