import { useQuery } from "react-query";
import { fetchLists } from "../utils/lists_api";
import BeenList from "./beenList";
import BookmarkList from "./bookmarkList";
import RecList from "./recList";

const Lists = () => {
	const { data } = useQuery("lists", fetchLists);

	if (data) {
		return (
			<div className="flex flex-row gap-x-10 justify-center mt-10 w-5/6">
				<BeenList list={data["places_been"]} />
				<BookmarkList list={data["bookmarks"]} />
				<RecList list={data["recs"]} />
			</div>
		);
	} else {
		return <></>;
	}
};
export default Lists;
