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
		<div className="mt-5 grid grid-cols-3">
			{posts.map((post) => {
				return <PostCard post={post} key={post.id} />;
			})}
		</div>
	);
};

export default Feed;
