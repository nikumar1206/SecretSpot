import {
	Card,
	CardBody,
	Typography,
	CardFooter,
} from "@material-tailwind/react";

const MiniPostCard = ({ place }) => {
	return (
		<Card className="w-96 m-0 mr-0">
			<img
				src={place.imageUrl}
				alt="img-blur-shadow"
				className="float-left object-cover overflow-hidden rounded-t-lg w-96 max-h-56"
			/>
			<CardBody className="text-center">
				<Typography variant="h5" className="mb-2">
					{place.name}
				</Typography>
				<Typography>{place.caption}</Typography>
			</CardBody>
			<CardFooter divider className="flex items-center justify-between py-3">
				<Typography variant="small">{place.location}</Typography>
				<Typography variant="small" color="gray" className="flex gap-1">
					<i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
					{/* {creator.username}
					{creator.id} */}
				</Typography>
			</CardFooter>
		</Card>
	);
};
export default MiniPostCard;
