import axios from "axios";
import { postForm } from "../types";

export const fetchAllPosts = async () => {
	try {
		let res = await axios.get("/api/posts");
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
