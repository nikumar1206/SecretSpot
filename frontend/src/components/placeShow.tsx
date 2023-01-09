import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPlaceById } from "../utils/place_api";

const PlaceShow = () => {
	const placeId = useParams().placeId;
	console.log("yerr");

	const { data } = useQuery("place", () => getPlaceById(placeId!));
	if (!data) return null;

	return (
		<div>
			<h1>Place Show</h1>
		</div>
	);
};
export default PlaceShow;
