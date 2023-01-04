import { useQuery } from "react-query";
import { fetchCurrentUser } from "../utils/user_api";
import BeenList from "./beenList";

const Lists = () => {
	const { data, isFetched } = useQuery("user", fetchCurrentUser);

	if (data) {
		console.log(data.places_been);

		return (
			<div>
				<BeenList list={data.places_been} />
				<h1>Want to Try</h1>
				<h1>Recommendations from friends</h1>
			</div>
		);
	}
};
export default Lists;
