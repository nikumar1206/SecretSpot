import axios from "axios";

export const fetchAllPosts = async () => {
	try {
		let res = await axios.get("/api/posts");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
