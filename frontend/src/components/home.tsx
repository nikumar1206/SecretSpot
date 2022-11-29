import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainView from "./content";
import Nav from "./nav";

const Home = () => {
	const navigate = useNavigate();
	const [view, setView] = useState("My Visits");

	// const handleLogout = async (e: React.SyntheticEvent) => {
	// 	e.preventDefault();
	// 	navigate("/");
	// };

	return (
		<div className="home-container">
			<Nav />
			<button
				className="toggle-my-visit-view"
				role={"radio"}
				onClick={() => setView("My Visits")}
			>
				My Visits
			</button>
			<button
				className="toggle-recommended-view"
				role={"radio"}
				onClick={() => setView("Recommended")}
			>
				Recommended
			</button>
			<MainView view={view} />
		</div>
	);
};
export default Home;
