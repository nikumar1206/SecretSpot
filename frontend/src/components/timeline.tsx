import { GoogleMap } from "@react-google-maps/api";
import { memo, useState } from "react";
import { Place } from "../types";
import googleMapsStyle from "../utils/googleMaps";

const containerStyle: React.CSSProperties = {
	width: "100vw",
	height: "calc(100vh - 80px)",
};

const center = {
	lat: 40.7128,
	lng: -74.006,
};

const Timeline = ({ places }: { places: Place[] }) => {
	const renderMap = () => {
		const [open, setOpen] = useState(false);
		const [place, setPlace] = useState<Place>(null);

		const handleDialogOpen = (place: Place) => {
			setOpen(true);
			setPlace(place);
			return null;
		};
		return (
			<GoogleMap
				mapContainerClassName="!static top-0 left-0"
				center={center}
				zoom={10}
				mapContainerStyle={containerStyle}
				options={{
					minZoom: 3,
					maxZoom: 15,
					panControl: false,
					disableDefaultUI: true,
					styles: googleMapsStyle,
					clickableIcons: false,
				}}
			>
				{/* {places.map((place) => {
					return (
						<Marker
							key={place.id}
							position={{ lat: place.lat, lng: place.lng }}
							icon={{
								url: place.imageURL + "#custom_marker",
								scaledSize: new window.google.maps.Size(28, 28),
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(28, 28),
							}}
							onClick={() => {
								handleDialogOpen(place);
								// map?.panTo({ lat: place.lat, lng: place.lng });
							}}
						/>
					);
				})} */}
				{/* <MapPostModal open={open} setOpen={setOpen} place={place} /> */}
			</GoogleMap>
		);
	};

	return renderMap();
};

export default memo(Timeline);
