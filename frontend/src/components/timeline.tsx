import { memo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Post } from "../types";
import googleMapsStyle from "../utils/googleMaps";

const containerStyle = {
	width: "100vw",
	height: "100vh",
};

const center = {
	lat: 40.7128,
	lng: -74.006,
};

const Timeline = ({
	posts,
	isLoaded,
}: {
	posts: Post[];
	isLoaded: boolean;
}) => {
	const renderMap = () => {
		return (
			<GoogleMap
				mapContainerClassName="absolute top-0 left-0"
				center={center}
				zoom={10}
				mapContainerStyle={containerStyle}
				options={{
					minZoom: 11,
					panControl: false,
					disableDefaultUI: true,
					styles: googleMapsStyle,
					clickableIcons: false,
				}}
			>
				{posts.map((post) => {
					return (
						<Marker
							key={post.id}
							position={{ lat: post.lat, lng: post.lng }}
							icon={{
								url: post.imageUrl,
								scaledSize: new window.google.maps.Size(25, 25),
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(25, 25),
							}}
							shape={{
								coords: [25, 25, 25],
								type: "circle",
							}}
							onClick={() => console.log("clicked")}
						/>
					);
				})}
			</GoogleMap>
		);
	};

	return isLoaded ? renderMap() : <div>Loading...</div>;
};

export default memo(Timeline);
