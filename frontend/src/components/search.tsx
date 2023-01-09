import { Dialog, Input } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const Search = () => {
	const [place, setPlace] = useState("");
	const [open, setOpen] = useState(true);

	const handleUpdate = (e: React.SyntheticEvent) => {
		setPlace((e.target as HTMLInputElement).value);
	};

	const handlePlaceChanged = () => {
		const placeName = document.getElementById("placeName") as HTMLInputElement;
		placeName.value = place;
	};

	return (
		<Dialog
			open={open}
			handler={() => setOpen(false)}
			size="lg"
			className="pt-5 px-10 pb-48"
		>
			<Autocomplete types={["restaurant"]} onPlaceChanged={handlePlaceChanged}>
				<Input
					variant="outlined"
					label="Location Name"
					type="text"
					size="md"
					color="teal"
					id="placeName"
					className="w-3"
					autoComplete="off"
					onChange={handleUpdate}
				/>
			</Autocomplete>
		</Dialog>
	);
};
export default Search;
