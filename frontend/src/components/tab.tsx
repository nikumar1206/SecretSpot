import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useState } from "react";

const TabComponent = () => {
	const [view, setView] = useState("My Visits");

	const data = [
		{
			label: "Feed",
			value: "feed",
		},
		{
			label: "My Visits",
			value: "visits",
		},

		{
			label: "Favorites",
			value: "vue",
		},

		{
			label: "Timeline",
			value: "timeline",
		},
	];

	return (
		<>
			<Tabs value="feed" className="bg-green-100 rounded-lg">
				<TabsHeader>
					{data.map(({ label, value }) => (
						<Tab key={value} value={value} className="w-36">
							{label}
						</Tab>
					))}
				</TabsHeader>
			</Tabs>
		</>
	);
};
export default TabComponent;
