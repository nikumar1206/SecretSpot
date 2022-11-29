import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Splash from "./components/splash";
import LoginContainer from "./components/loginContainer";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Splash />} />
				<Route path="/home" element={<Home />} />
				<Route path={"/register"} element={<LoginContainer />} />
				<Route path={"/login"} element={<LoginContainer />} />
			</Routes>
		</BrowserRouter>
	);
};
export default App;
