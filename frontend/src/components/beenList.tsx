import PostCard from "./postcard";

const BeenList = ({ list }) => {
	console.log(list);

	return (
		<div>
			<h1>Been List</h1>
			<div className="mt-5 grid grid-cols-3 gap-5">
				{list.map((item) => {
					return <PostCard post={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};
export default BeenList;
