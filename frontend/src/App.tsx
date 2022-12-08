import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./components/splash";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./components/home";

const App = () => {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route path="/home/*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
