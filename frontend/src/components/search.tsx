import { Input } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlace } from "../utils/place_api";

const Search = () => {
	const [place, setPlace] = useState("");
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	const handleUpdate = (e: React.SyntheticEvent) => {
		setPlace((e.target as HTMLInputElement).value);
	};

	const handlePlaceChanged = async () => {
		const placeName = document.getElementById("placeName") as HTMLInputElement;
		setPlace(placeName.value);
		const placeInfo = await getPlace(placeName.value);
		navigate(`/place/${placeInfo.id}`);
	};

	return (
		<Autocomplete types={["restaurant"]} onPlaceChanged={handlePlaceChanged}>
			<Input
				variant="outlined"
				label="Search for a Place"
				type="text"
				size="md"
				color="teal"
				id="placeName"
				className="w-3"
				autoComplete="off"
				onChange={handleUpdate}
				value={place}
			/>
		</Autocomplete>
	);
};
export default Search;
