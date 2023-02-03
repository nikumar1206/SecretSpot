import axios from "axios";

export const fetchLists = async () => {
	try {
		let res = await axios.get("/api/users/lists");
		return res.data;
	} catch (error) {
		throw new Error(`${error}`);
	}
};
