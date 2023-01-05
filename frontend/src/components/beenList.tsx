import { Typography } from "@material-tailwind/react";
import MiniPlaceCard from "./miniPostcard";
const BeenList = ({ list }) => {
	return (
		<div>
			<Typography variant="h4" className="text-center">
				Been
			</Typography>
			<div className="mt-5 flex flex-col gap-5">
				{list.map((item) => {
					return <MiniPlaceCard place={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};
export default BeenList;
