import axios from "axios";

export const getPlace = async (place: string) => {
	try {
		let res = await axios.get(`/api/place/search/${place}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getPlaceById = async (id: string) => {
	try {
		let res = await axios.get(`/api/place/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
