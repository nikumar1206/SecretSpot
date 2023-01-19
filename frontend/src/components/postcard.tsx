import {
	Card,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";
import { BiHide } from "react-icons/bi";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { Post } from "../types";
const PostCard = ({ post }: { post: Post }) => {
	// const changeTextColor = (rating: number) => {
	// 	if (rating >= 5.5) {
	// 		return "text-green-500";
	// 	} else if (rating >= 3) {
	// 		return "text-yellow-700";
	// 	} else {
	// 		return "text-red-500";
	// 	}
	// };
	// console.log(post);

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
		<Card className="w-96 h-6/6 m-0 mr-0">
			<div className=" flex flex-row space-x-[15rem] justify-center items-center py-1">
				<section className="flex flex-row gap-x-1 items-center">
					<img
						src={post.creator.pfpURL}
						alt=""
						className="w-7 h-7 rounded-full"
					/>
					<span className="text-gray-700 font-semibold text-sm">
						{post.creator.username}
					</span>
				</section>
				<div className="flex flex-row gap-x-2">
					<BiHide className="text-teal-500 hover:cursor-pointer font-bold" />
					<RiBookmarkFill className="text-teal-500 hover:cursor-pointer font-bold" />
					<RiBookmarkLine className="text-teal-500 hover:cursor-pointer font-bold" />
				</div>
			</div>
			<img
				src={post.place.imageURL}
				alt="img-blur-shadow"
				className="float-left object-cover overflow-hidden w-[32rem] max-h-56"
			/>
			<CardBody className="flex flex-row items-center justify-between">
				<Typography variant="h5">{post.place.name}</Typography>
				<div
					className={`rounded-full w-10 h-10 p-2 font-bold text-black ${changeBorderColor(
						post.rating
					)}	text-center`}
				>
					{post.rating}
				</div>
			</CardBody>
			<Typography className="text-center pb-2">{post.caption}</Typography>
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
