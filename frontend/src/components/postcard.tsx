import {
	Card,
	CardBody,
	CardFooter,
	IconButton,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Post } from "../types";
const PostCard = ({ post }: { post: Post }) => {
	const changeTextColor = (rating: number) => {
		if (rating >= 5.5) {
			return "text-green-500";
		} else if (rating >= 3) {
			return "text-yellow-700";
		} else {
			return "text-red-500";
		}
	};
	const changeBorderColor = (rating: number) => {
		if (rating >= 5.5) {
			return "border-green-500";
		} else if (rating >= 3) {
			return "border-yellow-700";
		} else {
			return "border-red-500";
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
			<div className=" flex flex-row space-x-72 justify-center">
				<section className="flex flex-row gap-x-1 items-center">
					<img
						src={post.creator.pfpURL}
						alt=""
						className="w-5 h-5 rounded-full"
					/>
					<span className="text-gray-700 font-semibold text-sm">
						{post.creator.username}
					</span>
				</section>
				<Menu>
					<MenuHandler>
						<IconButton
							color="teal"
							variant="text"
							size="sm"
							className="hover:bg-none text-teal-700"
							ripple={false}
						>
							<RxHamburgerMenu />
						</IconButton>
					</MenuHandler>
					<MenuList>
						<MenuItem>Hide</MenuItem>
						<MenuItem>Edit</MenuItem>
						<MenuItem>Delete</MenuItem>
					</MenuList>
				</Menu>
			</div>
			<img
				src={post.place.imageURL}
				alt="img-blur-shadow"
				className="float-left object-cover overflow-hidden w-96 max-h-56"
			/>
			<CardBody className="text-center flex flex-row items-center p-5">
				<Typography variant="h5" className="w-5/6">
					{post.place.name}
				</Typography>
				<div
					className={`rounded-2xl w-10 h-10 p-1.5 ${changeTextColor(
						post.rating
					)} border-2 ${changeBorderColor(post.rating)}	text-center`}
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
