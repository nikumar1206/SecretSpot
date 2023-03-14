import { GoogleMap, Marker } from "@react-google-maps/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Place } from "../types";
import googleMapsStyle from "../utils/googleMaps";
import { getPlaceById } from "../utils/place_api";

const PlaceShow = () => {
	const placeId = useParams().placeId;
	let data: Place | null = useQuery("place", () => getPlaceById(placeId!), {
		cacheTime: 0,
		keepPreviousData: false,
	}).data;

	const containerStyle: React.CSSProperties = {
		width: "100vw",
		height: "100vh",
	};

	if (!data)
		return (
			<div className="flex justify-center items-center h-screen bg-teal-100">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);

	if (data) {
		const center = {
			lat: data.lat,
			lng: data.lng + 0.015, //not the best solution, but it works on my screen
		};
		console.log(center);
		return (
			<div>
				<GoogleMap
					mapContainerClassName=""
					center={center}
					zoom={15}
					mapContainerStyle={containerStyle}
					options={{
						minZoom: 15,
						maxZoom: 15,
						panControl: false,
						disableDefaultUI: true,
						styles: googleMapsStyle,
						clickableIcons: false,
						disableDoubleClickZoom: true,
						draggable: false,
					}}
				>
					<Marker
						position={{ lat: data.lat, lng: data.lng }}
						icon={{
							url: data.imageURL + "#custom_marker",
							scaledSize: new window.google.maps.Size(75, 75),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(75, 75),
						}}
						clickable={false}
					/>
					<span className="text-8xl teal-700 font-h1 absolute top-2 left-0 p-5 rounded-lg">
						{data.name}
					</span>
					<div className="bg-white absolute right-10 top-2">
						{data.location}
					</div>
				</GoogleMap>
			</div>
		);
	}
	return <></>;
};
export default PlaceShow;
