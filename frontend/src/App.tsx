import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Splash from "./components/splash";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Splash />} />
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};
export default App;
