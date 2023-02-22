import { Input } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlace } from "../utils/place_api";

const Search = () => {
	const [place, setPlace] = useState("");
	const [placeLoaded, setplaceLoaded] = useState(true);
	const navigate = useNavigate();
	const [autocomplete, setAutocomplete] = useState<any>(null);
	const handleUpdate = (e: React.SyntheticEvent) => {
		setPlace((e.target as HTMLInputElement).value);
	};
	const handleLoad = (autocomplete: any) => {
		setAutocomplete(autocomplete);
	};

	const handlePlaceChanged = async () => {
		const placeName = document.getElementById("placeName") as HTMLInputElement;
		setplaceLoaded(false);
		autocomplete.getPlace();
		console.log(autocomplete.getPlace().photos[0].getUrl());

		setPlace(placeName.value);
		const placeInfo = await getPlace(placeName.value);
		setplaceLoaded(true);
		navigate(`/place/${placeInfo.id}`);
	};
	if (!placeLoaded) {
		return (
			<div className="flex justify-center items-center h-screen bg-teal-50">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	} else {
		return (
			<Autocomplete
				types={["restaurant"]}
				onPlaceChanged={handlePlaceChanged}
				onLoad={handleLoad}
			>
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
	}
};
export default Search;
