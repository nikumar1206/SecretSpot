import PostCard from "./postcard";
import { Post } from "../types";

const Feed = ({ posts }: { posts: Post[] }) => {
	return (
		<div className="mt-5 grid grid-cols-3">
			{posts.map((post) => {
				return <PostCard post={post} key={post.id} />;
			})}
		</div>
	);
};

export default Feed;
