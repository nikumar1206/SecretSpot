import { Post } from "../types";

interface MapPostModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	post: Post;
}

const MapPostModal = ({ open, setOpen, post }: MapPostModalProps) => {
	return (
		<div
			className={`${
				open ? "block" : "hidden"
			} absolute overflow-y-auto z-10 w-52 h-24 p-5 bg-white bottom-5 right-5 rounded-lg `}
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			<div>{post.place.name}</div>
			<div>{post.rating}</div>
		</div>
	);
};
export default MapPostModal;
