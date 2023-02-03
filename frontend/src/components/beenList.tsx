import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Typography } from "@material-tailwind/react";
import { User } from "../types";
import MiniPostCard from "./miniPostCard";
const BeenList = ({ list }: { list: User["places_been"] }) => {
	const [parent] = useAutoAnimate<HTMLDivElement>();
	return (
		<div className="w-1/3">
			<Typography variant="h4" className="text-center">
				Been
			</Typography>
			<div className="mt-5 flex flex-col gap-5" ref={parent}>
				{list.map((item) => {
					return <MiniPostCard post={item} key={item.id} type="been" />;
				})}
			</div>
		</div>
	);
};
export default BeenList;
