import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";

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

const PostCard = ({ post }: { post: Post }) => {
	return (
		<Card className="w-96 m-0 mr-0">
			<img
				src={post.imageUrl}
				alt="img-blur-shadow"
				className="l object-contain overflow-hidden rounded-t-lg"
			/>
			<CardBody className="text-center">
				<Typography variant="h5" className="mb-2">
					{post.name}
				</Typography>
				<Typography>{post.caption}</Typography>
			</CardBody>
			<CardFooter divider className="flex items-center justify-between py-3">
				<Typography variant="small">{post.location}</Typography>
				<Typography variant="small" color="gray" className="flex gap-1">
					<i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
					{post.attendies.length}
				</Typography>
			</CardFooter>
		</Card>
	);
};
export default PostCard;
