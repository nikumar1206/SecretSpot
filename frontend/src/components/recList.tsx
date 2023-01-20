import { Typography } from "@material-tailwind/react";
import { User } from "../types";
import MiniPlaceCard from "./miniPostcard";
const RecList = ({ list }: { list: User["places_been"] }) => {
	return (
		<div className="w-1/3">
			<Typography variant="h4" className="text-center">
				Recommendations
			</Typography>
			<div className="mt-5 flex flex-col gap-5">
				{list.map((item) => {
					return <MiniPlaceCard place={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};
export default RecList;
