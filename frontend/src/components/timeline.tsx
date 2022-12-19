import { memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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

const Timeline = ({ posts }: { posts: Post[] }) => {
	return (
		<div className="absolute top-0 left-0">
			<LoadScript googleMapsApiKey="AIzaSyDBq8CQhrMSr1j3c-U_u9pL0pFRk1QZdcg">
				<GoogleMap
					mapContainerClassName=""
					center={center}
					zoom={10}
					mapContainerStyle={containerStyle}
					options={{
						minZoom: 11,
						panControl: false,
						disableDefaultUI: true,
						styles: googleMapsStyle,
					}}
				>
					{posts.map((post) => {
						return (
							<Marker
								key={post.id}
								position={{ lat: post.lat, lng: post.lng }}
							/>
						);
					})}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default memo(Timeline);
