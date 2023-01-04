import { useQuery } from "react-query";
import { fetchCurrentUser } from "../utils/user_api";
import BeenList from "./beenList";

const Lists = () => {
	const { data } = useQuery("user", fetchCurrentUser);
	console.log(data);

	return (
		<div>
			<BeenList list={data} />
			<h1>Want to Try</h1>
			<h1>Recommendations from friends</h1>
		</div>
	);
};
export default Lists;
