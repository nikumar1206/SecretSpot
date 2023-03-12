import axios from "axios";

export const fetchPosts = async () => {
	try {
		let res = await axios.get("/api/posts");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchFeed = async () => {
	try {
		let res = await axios.get("/api/posts/feed");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
export const createPost = async (postplaceObj) => {
	try {
		let res = await axios.post("/api/posts/create", postplaceObj);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const removePost = async (postId: string) => {
	try {
		let res = await axios.delete(`/api/posts/${postId}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
