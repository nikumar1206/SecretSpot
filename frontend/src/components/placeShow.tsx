import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Place } from "../types";
import { getPlaceById } from "../utils/place_api";

const PlaceShow = () => {
	const placeId = useParams().placeId;
	let data: Place | null = useQuery("place", () => getPlaceById(placeId!), {
		cacheTime: 0,
		keepPreviousData: false,
	}).data;

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
