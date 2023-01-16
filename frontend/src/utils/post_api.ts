import axios from "axios";
import { postForm } from "../types";

export const fetchFeed = async () => {
	console.log("res");
	try {
		let res = await axios.get("/api/posts/feed");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
export const createPost = async (post: postForm) => {
	try {
		let res = await axios.post("/api/posts/create", post);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
