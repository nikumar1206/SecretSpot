import axios from "axios";

export const fetchMapsKey = async () => {
	try {
		let res = await axios.get("/api/maps");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
