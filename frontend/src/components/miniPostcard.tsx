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
		<Card className="w-80 h-24 m-0 mr-0 flex flex-row justify-center items-center shadow-lg">
			<Avatar src={place.imageURL} alt="img-blur-shadow" size="lg" />
			<CardBody className="text-center">
				<Typography variant="h6" className="mb-2">
					{place.name}
				</Typography>
			</CardBody>
			<CardFooter className="flex items-center justify-between py-3">
				<Typography variant="small">{place.location}</Typography>
				<Typography variant="small" color="gray" className="flex gap-1">
					<i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
				</Typography>
			</CardFooter>
		</Card>
	);
};
export default MiniPlaceCard;
