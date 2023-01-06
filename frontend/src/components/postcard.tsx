import {
	Card,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";
import { Post } from "../types";

const PostCard = ({ post }: { post: Post }) => {
	const changeColorRating = (rating: number) => {
		if (rating >= 5.5) {
			return "-green-500";
		} else if (rating >= 3) {
			return "-yellow-700";
		} else {
			return "-red-500";
		}
	};

	return (
		<Card className="w-96 h-80 m-0 mr-0">
			<img
				src={post.place.imageURL}
				alt="img-blur-shadow"
				className="float-left object-cover overflow-hidden rounded-t-lg w-96 max-h-56"
			/>
			<CardBody className="text-center flex flex-row items-center p-5">
				<Typography variant="h5" className="w-5/6">
					{post.place.name}
				</Typography>
				<div
					className={`rounded-2xl w-10 h-10 p-1.5 text${changeColorRating(
						post.rating
					)} border-2 border${changeColorRating(post.rating)}	text-center`}
				>
					{post.rating}
				</div>
			</CardBody>
			<Typography className="text-center pb-2">{post.caption}</Typography>
			<CardFooter divider className="flex items-center justify-between py-3">
				<Typography variant="small">{post.place.location}</Typography>
				<Typography variant="small" color="gray" className="flex gap-1">
					<i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
					{post.creator.username}
				</Typography>
			</CardFooter>
		</Card>
	);
};

export default PostCard;
