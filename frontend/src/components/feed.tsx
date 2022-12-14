import { useEffect, useState } from "react";
import { fetchAllPosts } from "../utils/post_api";

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
			{console.log(posts)}
			{posts.map((post) => {
				return (
					<div key={post.id}>
						<h1>{post.name}</h1>
						<h2>{post.location}</h2>
						<p>{post.caption}</p>
						<p>{post.attendies}</p>
						<p>{post.imageUrl}</p>
					</div>
				);
			})}
		</>
	);
};
export default Feed;
