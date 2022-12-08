import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Splash from "./components/splash";
import { ThemeProvider } from "@material-tailwind/react";

const App = () => {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route path="/home" element={<Nav />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
