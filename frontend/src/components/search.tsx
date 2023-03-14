import { Combobox } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { getPlace } from "../utils/place_api";
import { fetchUser } from "../utils/user_api";
import Checkbox from "./checkbox";
const Search = () => {
	const [followBool, setFollowBool] = useState(false);
	const [username, setUsername] = useState("");
	const [place, setPlace] = useState("");
	const [placeData, setPlaceData] =
		useState<google.maps.places.Autocomplete | null>(null);
	const [placeLoaded, setplaceLoaded] = useState(true);
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const data: User = useQuery("currentUser", () => fetchUser(username)).data;
	const [selectedFollower, setselectedFollower] = useState("");
	console.log(data);

	const filteredFollowers =
		query === ""
			? data.followers
			: data.followers.filter((follower) => {
					return follower.username.toLowerCase().includes(query.toLowerCase());
			  });
	const handleUpdate = (e: React.SyntheticEvent) => {
		setPlace((e.target as HTMLInputElement).value);
	};
	const queryClient = useQueryClient();
	const placeMutation = useMutation(getPlace, {
		onSuccess: () => {
			queryClient.invalidateQueries(["feed", "lists"]);
		},
	});
	const { refetch } = useQuery("user", () => fetchUser(username), {
		enabled: false,
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
	const handleFindUser = async () => {
		const res = await refetch();
		if (res.data) {
			console.log(res.data);

			navigate(`/user/${res.data.data.id}`);
		}
	};
	useEffect(() => {
		if (data) {
			setselectedFollower(data.followers[0].username);
		}
	}, [data]);
	const handlePlaceChanged = async () => {
		setplaceLoaded(false);
		const placeInfo = await placeMutation.mutateAsync(refinedPlaceObject());

		setplaceLoaded(true);
		navigate(`/place/${placeInfo.id}`);
	};
	if (!placeLoaded || !data) {
		return (
			<div className="flex justify-center items-center h-screen bg-teal-50">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col gap-y-5">
				<div className="flex gap-10">
					<Checkbox
						label="Search for a Person"
						onClick={() => {
							setFollowBool(true);
						}}
						isChecked={followBool}
						setIsChecked={setFollowBool}
					/>
					<Checkbox
						label="Search for a Place"
						onClick={() => {
							setFollowBool(false);
						}}
						isChecked={!followBool}
						setIsChecked={setFollowBool}
					/>
				</div>
				{followBool ? (
					<Combobox value={selectedFollower} onChange={setselectedFollower}>
						<Combobox.Input
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Options>
							{filteredFollowers.map((follower) => (
								<Combobox.Option key={follower.id} value={follower.username}>
									{follower.username}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Combobox>
				) : (
					// <div className="inline-flex gap-x-5">
					// 	<Input
					// 		variant="outlined"
					// 		label="Search for a Person"
					// 		type="text"
					// 		size="lg"
					// 		color="teal"
					// 		id="placeName"
					// 		className="w-3"
					// 		autoComplete="off"
					// 		onChange={(e) => setUsername(e.target.value)}
					// 		value={username}
					// 		autoFocus
					// 	/>

					// 	<Button
					// 		variant="outlined"
					// 		className="flex items-center gap-x-3 normal-case"
					// 		color="teal"
					// 		ripple={false}
					// 		onClick={handleFindUser}
					// 	>
					// 		Search
					// 		<BiSearchAlt className="h-5 w-5" />
					// 	</Button>
					// </div>
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
							autoFocus
						/>
					</Autocomplete>
				)}
			</div>
		);
	}
};
export default Search;
