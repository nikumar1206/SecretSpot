import {
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
} from "@material-tailwind/react";
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
	const data = [
		{
			label: "HTML",
			value: "html",
			desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
		},
		{
			label: "React",
			value: "react",
			desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
		},

		{
			label: "Vue",
			value: "vue",
			desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're 
      constantly trying to express ourselves and actualize our dreams.`,
		},

		{
			label: "Angular",
			value: "angular",
			desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
		},

		{
			label: "Svelte",
			value: "svelte",
			desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're 
      constantly trying to express ourselves and actualize our dreams.`,
		},
	];

	return (
		<Tabs value="html">
			<TabsHeader>
				{data.map(({ label, value }) => (
					<Tab key={value} value={value}>
						{label}
					</Tab>
				))}
			</TabsHeader>
			<TabsBody
				animate={{
					mount: { y: 0 },
					unmount: { y: 250 },
				}}
			>
				{data.map(({ value, desc }) => (
					<TabPanel key={value} value={value}>
						{desc}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	);
	// return (
	// 	<div className="home-container">
	// 		<Nav />
	// 		<button
	// 			className="toggle-my-visit-view"
	// 			role={"radio"}
	// 			onClick={() => setView("My Visits")}
	// 		>
	// 			My Visits
	// 		</button>
	// 		<button
	// 			className="toggle-recommended-view"
	// 			role={"radio"}
	// 			onClick={() => setView("Recommended")}
	// 		>
	// 			Recommended
	// 		</button>
	// 		<MainView view={view} />
	// 	</div>
	// );
};
export default Home;
