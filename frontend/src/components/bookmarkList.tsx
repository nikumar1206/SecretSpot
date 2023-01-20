import { Typography } from "@material-tailwind/react";
import { User } from "../types";
import MiniPlaceCard from "./miniPostcard";
const BookmarkList = ({ list }: { list: User["bookmarks"] }) => {
	return (
		<div className="w-1/3">
			<Typography variant="h4" className="text-center">
				Want to Try
			</Typography>
			<div className="mt-5 flex flex-col gap-5">
				{list.map((item) => {
					return <MiniPlaceCard place={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};
export default BookmarkList;
