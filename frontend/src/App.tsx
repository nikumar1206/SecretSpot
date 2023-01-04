import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Splash from "./components/splash";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./components/home";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProfilePage from "./components/userShowPage";

const App = () => {
	const queryClient = new QueryClient();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<Splash />} />
				<Route path="/home/*" element={<Home />} />
				<Route path="/user/" element={<UserProfilePage />} />
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
