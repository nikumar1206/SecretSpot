import { useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchAllPosts } from "../utils/post_api";
import Feed from "./feed";
import Lists from "./lists";
import Nav from "./nav";
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
		googleMapsApiKey: "AIzaSyDBq8CQhrMSr1j3c-U_u9pL0pFRk1QZdcg",
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
