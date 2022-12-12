import axios from "axios";

interface postInfo {
	name: string;
	location: string;
	imageUrl: string;
	caption: string;
	attendies: string[];
}

export const fetchAllPosts = async () => {
	try {
		let res = await axios.get("/api/posts");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
export const createPost = async (post: postInfo) => {
	try {
		let res = await axios.post("/api/posts", post);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
