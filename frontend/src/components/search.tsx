import { Input, Radio } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getPlace } from "../utils/place_api";

const Search = () => {
	const [followBool, setFollowBool] = useState(false);
	const [place, setPlace] = useState("");
	const [placeData, setPlaceData] =
		useState<google.maps.places.Autocomplete | null>(null);
	const [placeLoaded, setplaceLoaded] = useState(true);
	const navigate = useNavigate();
	const handleUpdate = (e: React.SyntheticEvent) => {
		setPlace((e.target as HTMLInputElement).value);
	};
	const queryClient = useQueryClient();
	const placeMutation = useMutation(getPlace, {
		onSuccess: () => {
			queryClient.invalidateQueries(["feed", "lists"]);
		},
	});

	const refinedPlaceObject = () => {
		const placeObject = placeData?.getPlace();

		return {
			place_id: placeObject?.place_id,
			place_name: placeObject?.name,
			place_address: placeObject?.formatted_address,
			place_rating: placeObject?.rating,
			place_price_level: placeObject?.price_level,
			maps_url: placeObject?.url,
			place_lat: placeObject!.geometry!.location?.lat(),
			place_lng: placeObject?.geometry?.location?.lng(),
			photo_link: placeObject?.photos?.[0].getUrl(),
		};
	};

	const handlePlaceChanged = async () => {
		setplaceLoaded(false);
		const placeInfo = await placeMutation.mutateAsync(refinedPlaceObject());

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
			<div className="flex flex-col mt-10 gap-y-5">
				<div className="flex gap-10">
					<Radio
						id="followers"
						name="type"
						label="Search for a Person"
						onClick={() => setFollowBool(true)}
						ripple={false}
						color="teal"
					/>
					<Radio
						id="place"
						name="type"
						label="Search for a Place"
						onClick={() => setFollowBool(false)}
						defaultChecked
						ripple={false}
						color="teal"
					/>
				</div>
				{followBool ? (
					<Input
						variant="outlined"
						label="Search for a Person"
						type="text"
						size="lg"
						color="teal"
						id="placeName"
						className="w-3"
						autoComplete="off"
						onChange={handleUpdate}
						value={place}
					/>
				) : (
					<Autocomplete
						types={["restaurant"]}
						onPlaceChanged={handlePlaceChanged}
						onLoad={(autocomplete) => setPlaceData(autocomplete)}
					>
						<Input
							variant="outlined"
							label="Search for a Place"
							type="text"
							size="lg"
							color="teal"
							id="placeName"
							className="w-3"
							autoComplete="off"
							onChange={handleUpdate}
							value={place}
						/>
					</Autocomplete>
				)}
			</div>
		);
	}
};
export default Search;
