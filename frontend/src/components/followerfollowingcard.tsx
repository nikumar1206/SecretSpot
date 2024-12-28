import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { User } from "../types";

const FollowerFollowingCard = ({ person }: { person: User }) => {
	return (
		<>
			<Card
				variant="gradient"
				className="flex flex-row space-x-[7.5rem] items-center shadow-lg bg-[#F6F6F6] p-2"
			>
				<Avatar src={person.pfpURL} className="rounded-full w-10 h-10" />
				<Typography className="text-lg font-bold">{person.email}</Typography>
				<Button
					className="font-bold normal-case"
					ripple={false}
					size="sm"
					color="teal"
				>
					Following
				</Button>
			</Card>
		</>
	);
};
export default FollowerFollowingCard;
