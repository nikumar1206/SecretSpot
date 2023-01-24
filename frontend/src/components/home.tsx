import { useJsApiLoader } from "@react-google-maps/api";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { Place, Post } from "../types";
import { fetchFeed, fetchPosts } from "../utils/post_api";
import Feed from "./feed";
import Lists from "./lists";
import Nav from "./nav";
import Search from "./search";
import Timeline from "./timeline";

type Libraries = (
	| "drawing"
	| "geometry"
	| "localContext"
	| "places"
	| "visualization"
)[];

const libraries: Libraries = ["places"];
const Home = () => {
	const params = useParams()["*"] as string;

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "",
		libraries: libraries, // ,
	});

	const results = useQueries([
		{
			queryKey: "feed",
			queryFn: fetchFeed,
		},
		{
			queryKey: "myPosts",
			queryFn: fetchPosts,
		},
	]);

	const feed: Post[] = results[0].data;
	const myPlaces: Place[] = results[1].data;
	const isFetched = results.every((result) => result.isSuccess);

	let component = null;
	switch (params) {
		case "feed":
			component = <Feed posts={feed} />;
			break;
		case "lists":
			component = <Lists />;
			break;
		case "search":
			component = <Search />;
			break;
		case "timeline":
			component = <Timeline places={myPlaces} isLoaded={isLoaded} />;
			break;

		default:
			component = null;
			break;
	}

	{
		return isFetched ? (
			<>
				<Nav params={params} />
				<div className="bg-teal-50 w-full flex justify-center">
					{isLoaded ? component : <></>}
				</div>
			</>
		) : (
			<div className="flex justify-center items-center h-screen bg-teal-100">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}
};
export default Home;
