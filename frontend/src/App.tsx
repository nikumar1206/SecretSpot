import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./components/splash";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./components/home";
import { useEffect, useState } from "react";
import { isAuthed } from "./utils/user_api";
import userContext from "./utils/userContext";

const App = () => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		isAuthed().then((res) => {
			setCurrentUser(res);
		});
	}, []);

	return (
		<ThemeProvider>
			<BrowserRouter>
				<userContext.Provider value={{ currentUser, setCurrentUser }}>
					<Routes>
						<Route path="/" element={<Splash />} />
						<Route path="/home/*" element={<Home />} />
					</Routes>
				</userContext.Provider>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
