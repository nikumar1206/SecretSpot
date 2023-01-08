import { GoogleMap, Marker } from "@react-google-maps/api";
import { memo, useState } from "react";
import { Post } from "../types";
import googleMapsStyle from "../utils/googleMaps";
import MapPostModal from "./mapPostModal";

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
		const [open, setOpen] = useState(false);
		const [post, setPost] = useState<Post>(posts[0]);

		const handleDialogOpen = (post: Post) => {
			setOpen(true);
			setPost(post);
			return null;
		};
		return (
			<>
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
								position={{ lat: post.place.lat, lng: post.place.lng }}
								icon={{
									url: post.place.imageURL + "#custom_marker",
									scaledSize: new window.google.maps.Size(28, 28),
									origin: new window.google.maps.Point(0, 0),
									anchor: new window.google.maps.Point(28, 28),
								}}
								onClick={() => handleDialogOpen(post)}
							/>
						);
					})}
				</GoogleMap>
				<MapPostModal open={open} setOpen={setOpen} post={post} />
			</>
		);
	};

	return isLoaded ? renderMap() : <div>Loading...</div>;
};

export default memo(Timeline);
