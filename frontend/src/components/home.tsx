import { useParams } from "react-router-dom";
import Feed from "./feed";
import Nav from "./nav";
import Timeline from "./timeline";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "../utils/post_api";
import { Post } from "../types";
import { useJsApiLoader } from "@react-google-maps/api";
import Lists from "./lists";

type Libraries = (
	| "drawing"
	| "geometry"
	| "localContext"
	| "places"
	| "visualization"
)[];

const libraries: Libraries = ["places"];
const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const params = useParams()["*"] as string;

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDBq8CQhrMSr1j3c-U_u9pL0pFRk1QZdcg",
		libraries: libraries, // ,
	});

	useEffect(() => {
		fetchAllPosts().then((res) => {
			setPosts(res);
		});
	}, []);

	let component = null;
	switch (params) {
		case "feed":
			component = <Feed posts={posts} isLoaded={isLoaded} />;
			break;
		case "lists":
			component = <Lists />;
			break;
		case "berr":
			component = <></>;
			break;
		case "timeline":
			component = <Timeline posts={posts} isLoaded={isLoaded} />;
			break;

		default:
			component = null;
			break;
	}

	return (
		<>
			<Nav params={params} />
			{isLoaded ? component : <></>}
		</>
	);
};
export default Home;
