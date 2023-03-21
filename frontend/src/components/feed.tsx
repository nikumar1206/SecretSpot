import { useState } from "react";
import { Post } from "../types";
import Pagination from "./pagination";
import PostCard from "./postcard";

const Feed = ({ posts }: { posts: Post[] }) => {
	const itemsPerPage = 5;
	const [pageNumber, setPageNumber] = useState(1);

	const paginatedPosts = posts.slice(
		(pageNumber - 1) * itemsPerPage,
		pageNumber * itemsPerPage
	);

	return (
		<div className="flex flex-col mb-5 pt-10 items-center bg-teal-50 w-full h-full">
			<div className="grid grid-cols-1 gap-5">
				{paginatedPosts.map((post) => {
					return <PostCard post={post} key={post.id} />;
				})}
			</div>

			{posts.length > itemsPerPage ? (
				<Pagination
					currentPage={pageNumber}
					setPageNumber={setPageNumber}
					totalPages={Math.ceil(posts.length / itemsPerPage)}
				/>
			) : null}
		</div>
	);
};

export default Feed;
