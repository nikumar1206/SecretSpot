import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Typography } from "@material-tailwind/react";
import { User } from "../types";
import MiniPlaceCard from "./miniPostcard";
const BookmarkList = ({ list }: { list: User["bookmarks"] }) => {
	const [parent] = useAutoAnimate<HTMLDivElement>();
	return (
		<div className="w-1/3">
			<Typography variant="h4" className="text-center">
				Want to Try
			</Typography>
			<div className="mt-5 flex flex-col gap-5" ref={parent}>
				{list.map((item) => {
					return <MiniPlaceCard place={item} key={item.id} type="bookmark" />;
				})}
			</div>
		</div>
	);
};
export default BookmarkList;
