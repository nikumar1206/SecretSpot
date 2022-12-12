import { useParams } from "react-router-dom";
import { isAuthed } from "../utils/user_api";
import Feed from "./feed";
import Nav from "./nav";
import Timeline from "./timeline";

const Home = () => {
	isAuthed().then((res) => {
		return console.log(res);
	});

	const params = useParams()["*"];

	let component = null;
	switch (params) {
		case "feed":
			component = <Feed />;
			break;
		case "feed":
			component = <></>;
			break;
		case "feed":
			component = <></>;
			break;
		case "timeline":
			component = <Timeline />;
			break;

		default:
			component = null;
			break;
	}

	return (
		<>
			<Nav params={params!} />
			{component}
		</>
	);
};
export default Home;
