import { Combobox, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { getPlace } from "../utils/place_api";
import { fetchAllUsers, fetchUser } from "../utils/user_api";
import Checkbox from "./checkbox";
const Search = () => {
	const [followBool, setFollowBool] = useState(false);
	const [place, setPlace] = useState("");
	const [placeData, setPlaceData] =
		useState<google.maps.places.Autocomplete | null>(null);
	const [placeLoaded, setplaceLoaded] = useState(true);
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const users = useQuery("fetchAllUsers", fetchAllUsers).data;
	const [selectedFollower, setselectedFollower] = useState("");

	const filteredFollowers = (): User[] => {
		return query === ""
			? users.data
			: users.data.filter((follower: User) => {
					return follower.username.toLowerCase().includes(query.toLowerCase());
			  });
	};
	const handleUpdate = (e: React.SyntheticEvent) => {
		setPlace((e.target as HTMLInputElement).value);
	};
	const queryClient = useQueryClient();
	const placeMutation = useMutation(getPlace, {
		onSuccess: () => {
			queryClient.invalidateQueries(["feed", "lists"]);
		},
	});
	const { refetch } = useQuery("findFollower", () => fetchUser(query), {
		enabled: false,
	});
	console.log(query);

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
		if (users) {
			setselectedFollower(users.data[0].username);
		}
	}, [users]);
	const handlePlaceChanged = async () => {
		setplaceLoaded(false);
		const placeInfo = await placeMutation.mutateAsync(refinedPlaceObject());

		setplaceLoaded(true);
		navigate(`/place/${placeInfo.id}`);
	};
	if (!placeLoaded || !users) {
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
						<div className="relative mt-1">
							<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
								<Combobox.Input
									autoFocus
									className=" focus:border-transparent focus:outline-none w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
									displayValue={(person: User) => person.username}
									onChange={(e) => setQuery(e.currentTarget.value)}
									value={query}
									placeholder="Search for a person"
								/>
								<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
									<HiChevronUpDown
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</Combobox.Button>
							</div>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								// afterLeave={() => setQuery("")}
							>
								<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredFollowers().length === 0 && query !== "" ? (
										<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
											Nothing found.
										</div>
									) : (
										filteredFollowers().map((person: User) => (
											<Combobox.Option
												key={person.id}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active ? "bg-teal-600 text-white" : "text-gray-900"
													}`
												}
												value={person}
											>
												{({ selected, active }) => (
													<>
														<span
															className={`block truncate ${
																selected ? "font-medium" : "font-normal"
															}`}
														>
															{person.username}
														</span>
														{selected ? (
															<span
																className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																	active ? "text-white" : "text-teal-600"
																}`}
															>
																<IoMdCheckmark
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Combobox.Option>
										))
									)}
								</Combobox.Options>
							</Transition>
						</div>
						<motion.button
							className="flex items-center gap-x-3 normal-case"
							color="teal"
							onClick={handleFindUser}
						>
							Search
							<BiSearchAlt className="h-5 w-5" />
						</motion.button>
					</Combobox>
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
							autoFocus
						/>
					</Autocomplete>
				)}
			</div>
		);
	}
};
export default Search;
