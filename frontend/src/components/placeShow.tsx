import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Place } from "../types";
import { getPlaceById } from "../utils/place_api";

const PlaceShow = () => {
	const placeId = useParams().placeId;

	const data: Place = useQuery("place", () => getPlaceById(placeId!)).data;
	if (!data) return null;

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
