import { useQuery } from "react-query";
import { fetchCurrentUser } from "../utils/user_api";
import BeenList from "./beenList";
import BookmarkList from "./bookmarkList";
import RecList from "./recList";

const Lists = () => {
	const { data } = useQuery("user", fetchCurrentUser);

	if (data) {
		return (
			<div className="flex flex-row gap-x-10 justify-center mt-10">
				<BeenList list={data.places_been} />
				<BookmarkList list={data.places_been} />
				<RecList list={data.places_been} />
			</div>
		);
	} else {
		return <></>;
	}
};
export default Lists;
