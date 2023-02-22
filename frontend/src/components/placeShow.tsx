import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Place } from "../types";
import { getPlaceById } from "../utils/place_api";

const PlaceShow = () => {
	const placeId = useParams().placeId;
	console.log(placeId);
	const data: Place = useQuery("place", () => getPlaceById(placeId!)).data;
	if (!data)
		return (
			<div className="flex justify-center items-center h-screen bg-teal-100">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);

	return (
		<div>
			<h1>{data.name}</h1>
			<div className="flex justify-center w-4/6 h-72 overflow-hidden">
				<img
					src={data.imageURL}
					alt="yerr"
					className="w-full object-contain backdrop-blur-2xl"
				/>
			</div>
		</div>
	);
};
export default PlaceShow;
