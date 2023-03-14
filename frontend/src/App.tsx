import { useJsApiLoader } from "@react-google-maps/api";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import PlaceShow from "./components/placeShow";
import ProtectedRoute from "./components/protectedRoute";
import Splash from "./components/splash";
import UserProfilePage from "./components/userShowPage";

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

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDBq8CQhrMSr1j3c-U_u9pL0pFRk1QZdcg",
		libraries: libraries, // ,
	});

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
	if (!isLoaded) return null;

	return (
		<AnimatePresence mode="wait">
			{React.cloneElement(element, { key: location.pathname })}
		</AnimatePresence>
	);
};
export default App;
