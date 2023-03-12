import axios from "axios";

export const getPlace = async (placeData) => {
	try {
		let res = await axios.post("/api/places/search/", placeData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getPlaceById = async (id: string) => {
	try {
		let res = await axios.get(`/api/places/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
