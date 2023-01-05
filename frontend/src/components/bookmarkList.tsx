import { Typography } from "@material-tailwind/react";
import MiniPlaceCard from "./miniPostcard";
const BookmarkList = ({ list }) => {
	return (
		<div>
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
