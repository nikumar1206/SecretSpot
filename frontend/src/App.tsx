import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import PlaceShow from "./components/placeShow";
import Splash from "./components/splash";
import UserProfilePage from "./components/userShowPage";

const App = () => {
	const queryClient = new QueryClient();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Splash />} />
				<Route path="/home/*" element={<Home />} />
				<Route path="/user/" element={<UserProfilePage />} />
				<Route path="/place/:placeId" element={<PlaceShow />} />
			</>
		)
	);

	return (
		<QueryClientProvider client={queryClient} contextSharing={true}>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	);
};
export default App;
