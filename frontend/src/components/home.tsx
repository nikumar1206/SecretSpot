import { useParams } from "react-router-dom";
import Feed from "./feed";
import Nav from "./nav";
import Timeline from "./timeline";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "../utils/post_api";
import { Post } from "../types";

const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	useEffect(() => {
		fetchAllPosts().then((res) => {
			setPosts(res);
		});
	}, []);

	const params = useParams()["*"];

	let component = null;
	switch (params) {
		case "feed":
			component = <Feed posts={posts} />;
			break;
		case "feed":
			component = <></>;
			break;
		case "feed":
			component = <></>;
			break;
		case "timeline":
			component = <Timeline posts={posts} />;
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
