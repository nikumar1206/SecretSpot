import axios from "axios";

export const addBookmark = async (placeId: string) => {
	try {
		let res = await axios.post(`/api/posts/bookmark/${placeId}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const removeBookmark = async (placeId: string) => {
	try {
		let res = await axios.delete(`/api/posts/bookmark/${placeId}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
