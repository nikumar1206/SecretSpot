import { LoadScriptNext } from "@react-google-maps/api";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useRoutes } from "react-router";
import Home from "./components/home";
import NotFound from "./components/notFound";
import PlaceShow from "./components/placeShow";
import ProtectedRoute from "./components/protectedRoute";
import Splash from "./components/splash";
import UserProfilePage from "./components/userShowPage";
import { fetchMapsKey } from "./utils/maps_api";

type Libraries = (
	| "drawing"
	| "geometry"
	| "localContext"
	| "places"
	| "visualization"
)[];

const libraries: Libraries = ["places"];

const App = () => {
	const location = useLocation();
	const { data } = useQuery("mapsKey", fetchMapsKey);
	const element = useRoutes([
		{ path: "*", element: <NotFound /> },
		{ path: "/", element: <Splash /> },
		{
			path: "/home/*",
			element: (
				<ProtectedRoute>
					<Home />
				</ProtectedRoute>
			),
		},
		{
			path: "/user/*",
			element: (
				<ProtectedRoute>
					<UserProfilePage />
				</ProtectedRoute>
			),
		},
		{
			path: "/place/:placeId",
			element: (
				<ProtectedRoute>
					<PlaceShow />
				</ProtectedRoute>
			),
		},
	]);
	if (!element) return null;

	if (data) {
		return (
			<LoadScriptNext googleMapsApiKey={data.key} libraries={libraries}>
				<AnimatePresence mode="wait">
					{React.cloneElement(element, { key: location.pathname })}
				</AnimatePresence>
			</LoadScriptNext>
		);
	}
	return null;
};
export default App;
