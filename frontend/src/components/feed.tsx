import { useEffect, useState } from "react";
import { fetchAllPosts } from "../utils/post_api";
import PostCard from "./postcard";
interface Post {
	id: string;
	name: string;
	location: string;
	caption: string;
	attendies: string[];
	createdAt: string;
	updatedAt: string;
	imageUrl: string;
}
const Feed = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	useEffect(() => {
		fetchAllPosts().then((res) => {
			setPosts(res);
		});
	}, []);
	return (
		<>
			{posts.map((post) => {
				return <PostCard post={post} key={post.id} />;
			})}
		</>
	);
};
export default Feed;
