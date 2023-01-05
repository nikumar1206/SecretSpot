import { Post } from "../types";
import PostCard from "./postcard";

const Feed = ({ posts }: { posts: Post[] }) => {
	return (
		<div className="mt-5 grid grid-cols-3 gap-5">
			{posts.map((post) => {
				return <PostCard post={post} key={post.id} />;
			})}
		</div>
	);
};

export default Feed;
