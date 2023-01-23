import {
	Card,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { Post } from "../types";
import { addBookmark, removeBookmark } from "../utils/bookmark_api";
const PostCard = ({ post }: { post: Post }) => {
	const [errors, setErrors] = useState([]);
	const queryClient = useQueryClient();
	const removeBookmarkMutation = useMutation(removeBookmark, {
		onSettled: () => queryClient.invalidateQueries("posts"),
	});
	const addBookmarkMutation = useMutation(addBookmark, {
		onSettled: () => {
			console.log("yeerr");
			queryClient.invalidateQueries("posts");
		},
	});

	const handleBookmarkAdd = async () => {
		const res = await addBookmarkMutation.mutateAsync(post.place.id);
		if (res.errors) {
			setErrors(res.errors);
		} else {
			return console.log(res);
		}
	};

	const handleBookmarkRemove = async () => {
		const res = await removeBookmarkMutation.mutateAsync(post.place.id);
		if (res.errors) {
			setErrors(res.errors);
		} else {
			return console.log(res);
		}
	};

	const changeBorderColor = (rating: number) => {
		if (rating >= 5.5) {
			return "bg-rateGreen";
		} else if (rating >= 3) {
			return "bg-rateYellow";
		} else {
			return "bg-rateRed";
		}
	};
	const convertedDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-us", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};
	return (
		<Card className="w-[28rem] h-[29rem] m-0 mr-0">
			<div className=" flex flex-row space-x-[19rem] justify-center items-center py-2">
				<section className="flex flex-row gap-x-1 items-center">
					<img
						src={post.creator.pfpURL}
						alt=""
						className="w-9 h-9 rounded-full"
					/>
					<span className="text-gray-700 font-semibold text-sm">
						{post.creator.username}
					</span>
				</section>
				<div className="flex flex-row gap-x-3 text-[20px]">
					<BiHide className="text-teal-500 hover:cursor-pointer font-bold" />
					{post.bookmarked ? (
						<RiBookmarkFill
							onClick={handleBookmarkRemove}
							className="text-teal-500 hover:cursor-pointer font-bold"
						/>
					) : (
						<RiBookmarkLine
							onClick={handleBookmarkAdd}
							className="text-teal-500 hover:cursor-pointer font-bold"
						/>
					)}
				</div>
			</div>
			{errors}
			<img
				src={post.place.imageURL}
				alt="img-blur-shadow"
				className="float-left object-cover overflow-hidden w-[32rem] max-h-56"
			/>
			<CardBody className="flex flex-row flex-grow items-center justify-between">
				<Typography variant="h5">{post.place.name}</Typography>
				<div
					className={`rounded-md w-8 h-8 font-bold text-black ${changeBorderColor(
						post.rating
					)} flex justify-center items-center`}
				>
					{post.rating}
				</div>
			</CardBody>
			<Typography className="flex flex-grow justify-center">
				{post.caption}
			</Typography>
			<CardFooter divider className="flex items-center justify-between py-3">
				<Typography variant="small">{post.place.location}</Typography>
				<Typography variant="small" color="gray" className="flex gap-1">
					<i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
					{convertedDate(post.createdAt)}
				</Typography>
			</CardFooter>
		</Card>
	);
};

export default PostCard;
