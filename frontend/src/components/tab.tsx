import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const TabComponent = ({ params }: { params: string }) => {
	const navigate = useNavigate();

	const handleTabClick = (sublink: string) => {
		navigate(`/home/${sublink}`);
	};

	const data = [
		{
			label: "Feed",
			value: "feed",
		},
		{
			label: "My Lists",
			value: "lists",
		},

		{
			label: "Favorites",
			value: "favorites",
		},

		{
			label: "Timeline",
			value: "timeline",
		},
	];

	return (
		<>
			<Tabs value={params} className="bg-green-100 rounded-lg">
				<TabsHeader>
					{data.map(({ label, value }) => (
						<Tab
							key={value}
							value={value}
							className="w-36"
							onClick={() => handleTabClick(value)}
						>
							{label}
						</Tab>
					))}
				</TabsHeader>
			</Tabs>
		</>
	);
};
export default TabComponent;
