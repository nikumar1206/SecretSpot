import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Splash from "./components/splash";
import LoginContainer from "./components/loginContainer";
import { Button, ThemeProvider } from "@material-tailwind/react";

const App = () => {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route path="/home" element={<Home />} />
					<Route path={"/register"} element={<LoginContainer />} />
					<Route path={"/login"} element={<LoginContainer />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
