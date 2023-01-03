import { useQuery } from "react-query";
import BeenList from "./beenList";
import { fetchCurrentUser } from "../utils/user_api";

const Lists = () => {
	const { data, error, isLoading } = useQuery("beenList", fetchCurrentUser);

	return (
		<div>
			<BeenList list={data} />
			<h1>Want to Try</h1>
			<h1>Recommendations from friends</h1>
		</div>
	);
};
export default Lists;
