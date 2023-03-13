import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import PlaceShow from "./components/placeShow";
import Splash from "./components/splash";
import UserProfilePage from "./components/userShowPage";

const App = () => {
	const location = useLocation();

	const element = useRoutes([
		{ path: "*", element: <NotFound /> },
		{ path: "/", element: <Splash /> },
		{ path: "/home/*", element: <Home /> },
		{ path: "/user/*", element: <UserProfilePage /> },
		{ path: "/place/:placeId", element: <PlaceShow /> },
	]);
	if (!element) return null;

	return (
		<AnimatePresence mode="wait">
			{React.cloneElement(element, { key: location.pathname })}
		</AnimatePresence>
	);
};
export default App;
