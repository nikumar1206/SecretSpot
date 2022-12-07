import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Splash from "./components/splash";
import { ThemeProvider } from "@material-tailwind/react";

const App = () => {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
