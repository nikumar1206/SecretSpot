import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { RiBookmarkFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { Place } from "../types";
import { addBookmark, removeBookmark } from "../utils/bookmark_api";

const MiniPlaceCard = ({ place, type }: { place: Place; type: string }) => {
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
		const res = await addBookmarkMutation.mutateAsync(place.id);
		if (res.errors) {
			setErrors(res.errors);
		} else {
			return console.log(res);
		}
	};

	const handleBookmarkRemove = async () => {
		const res = await removeBookmarkMutation.mutateAsync(place.id);
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
								place.rating!
							)} flex justify-center items-center`}
						>
							{place.rating}
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
		<Card className="w-96 h-24 flex flex-row text-center shadow-lg">
			<Typography variant="h6" className="line-clamp-3 my-auto w-1/3 px-2">
				{place.name}
			</Typography>
			<Typography variant="small" className="w-1/3 flex items-center">
				{place.location}
			</Typography>
			{handleWildCard()}
		</Card>
	);
};
export default MiniPlaceCard;
