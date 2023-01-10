import { useState } from "react";
import { Post } from "../types";
import PostCard from "./postcard";

const Feed = ({ posts }: { posts: Post[] }) => {
	const itemsPerPage = 5;
	const [pageNumber, setPageNumber] = useState(1);

	const paginatedPosts = posts.slice(
		(pageNumber - 1) * itemsPerPage,
		pageNumber * itemsPerPage
	);

	return (
		<div className="flex flex-col">
			<div className="pt-10 grid grid-cols-1 gap-5">
				{paginatedPosts.map((post) => {
					return <PostCard post={post} key={post.id} />;
				})}
			</div>
			<button onClick={() => setPageNumber(pageNumber + 1)}>
				increment pageNumber
			</button>
		</div>
	);
};

export default Feed;
