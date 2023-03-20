import { motion } from "framer-motion";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { Place, Post } from "../types";
import { fetchFeed, fetchPosts } from "../utils/post_api";
import { fetchCurrentUser } from "../utils/user_api";
import Feed from "./feed";
import Lists from "./lists";
import Nav from "./nav";
import Timeline from "./timeline";

const Home = () => {
	const params = useParams()["*"] as string;

	const results = useQueries([
		{
			queryKey: "feed",
			queryFn: fetchFeed,
		},
		{
			queryKey: "myPosts",
			queryFn: fetchPosts,
		},
		{
			queryKey: "currentUser",
			queryFn: fetchCurrentUser, // I think its silly not to call this once user is logged in, perhaps this should happen earlier
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
		case "timeline":
			component = <Timeline places={myPlaces} />;
			break;
		default:
			component = null;
			break;
	}

	if (isFetched) {
		return (
			<>
				<Nav params={params} />
				<motion.div
					className="w-full flex justify-center h-[calc(100vh-80px)]"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
				>
					{component}
				</motion.div>
			</>
		);
	}
	return null;
};
export default Home;
