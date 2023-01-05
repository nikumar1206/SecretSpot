import { Typography } from "@material-tailwind/react";
import MiniPlaceCard from "./miniPostcard";
const RecList = ({ list }) => {
	return (
		<div>
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
