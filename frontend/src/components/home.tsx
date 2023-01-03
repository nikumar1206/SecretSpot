import { useParams } from "react-router-dom";
import Feed from "./feed";
import Nav from "./nav";
import Timeline from "./timeline";
import { fetchAllPosts } from "../utils/post_api";
import { useJsApiLoader } from "@react-google-maps/api";
import Lists from "./lists";
import { useQuery } from "react-query";

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

	const { data } = useQuery("posts", fetchAllPosts);

	let component = null;
	switch (params) {
		case "feed":
			component = <Feed posts={data} />;
			break;
		case "lists":
			component = <Lists />;
			break;
		case "berr":
			component = <></>;
			break;
		case "timeline":
			component = <Timeline posts={data} isLoaded={isLoaded} />;
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
