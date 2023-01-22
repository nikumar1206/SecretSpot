import {
	Avatar,
	Card,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";
import { Place } from "../types";

const MiniPlaceCard = ({ place }: { place: Place }) => {
	return (
		<Card className="w-80 h-24 flex flex-row text-center shadow-lg">
			<Avatar
				src={place.imageURL}
				alt="img-blur-shadow"
				className="h-full w-28"
			/>
			<CardBody className="flex justify-center items-center">
				<Typography variant="h6" className=" overflow-ellipsis text-center">
					{place.name}
				</Typography>
			</CardBody>
			<CardFooter className="flex items-center justify-between">
				<Typography variant="small">{place.location}</Typography>
				<Typography variant="small" color="gray" className="flex gap-1">
					<i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
				</Typography>
			</CardFooter>
		</Card>
	);
};
export default MiniPlaceCard;
