import { Card, Typography } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { RiBookmarkFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { Post } from "../types";
import { addBookmark, removeBookmark } from "../utils/bookmark_api";
const MiniPostCard = ({ post, type }: { post: Post; type: string }) => {
	const [errors, setErrors] = useState("");
	const queryClient = useQueryClient();
	const changeBorderColor = (rating: number) => {
		if (rating >= 5.5) {
			return "bg-rateGreen";
		} else if (rating >= 3) {
			return "bg-rateYellow";
		} else {
			return "bg-rateRed";
		}
	};
	const removeBookmarkMutation = useMutation(removeBookmark, {
		onSuccess: () => queryClient.refetchQueries("feed"),
	});
	const addBookmarkMutation = useMutation(addBookmark, {
		onSettled: () => queryClient.refetchQueries("feed"),
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
	const handleWildCard = () => {
		switch (type) {
			case "been":
				return (
					<div className="w-1/3 flex justify-center items-center">
						<span
							className={`rounded-md w-8 h-8 font-bold text-black ${changeBorderColor(
								post.rating
							)} flex justify-center items-center`}
						>
							{post.rating}
						</span>
					</div>
				);
			case "bookmark":
				return (
					<div className="w-1/3 flex justify-center items-center">
						<button>
							<RiBookmarkFill
								onClick={handleBookmarkRemove}
								className="text-teal-500 hover:cursor-pointer font-bold text-2xl"
							/>
						</button>
					</div>
				);
			case "rec":
				return (
					<button>
						<CiSquareRemove />
					</button>
				);
			default:
				break;
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 75 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<Card className="w-96 h-24 flex flex-row text-center shadow-lg">
					<Typography variant="h6" className="line-clamp-3 my-auto w-1/3 px-2">
						{post.place.name}
					</Typography>
					<Typography variant="small" className="w-1/3 flex items-center">
						{post.place.location}
					</Typography>
					{handleWildCard()}
				</Card>
			</motion.div>
		</AnimatePresence>
	);
};
export default MiniPostCard;
