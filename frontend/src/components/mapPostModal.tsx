import { Place } from "../types";

interface MapPostModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	place: Place;
}

const MapPostModal = ({ open, setOpen, place }: MapPostModalProps) => {
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
			<div>{place.name}</div>
		</div>
	);
};
export default MapPostModal;
