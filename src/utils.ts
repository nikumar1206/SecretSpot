import axios from "axios";

export const findImageUrl = async (req: any) => {
	const baseUrl = "https://www.googleapis.com/customsearch/v1/";
	const params = {
		key: process.env.SEARCH_API_KEY,
		cx: process.env.SEARCH_ENGINE_ID,
		q: `${req.body.nameLocation}`,
		searchType: "image",
	};

	const response = await axios.get(baseUrl, { params });
	if (response.data.items[0].link.includes("fbsbx")) {
		return response.data.items[1].link as string;
	} else {
		return response.data.items[0].link as string;
	}
};

export const findLatLng = async (req: any) => {
	const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
	const params = {
		key: process.env.GOOGLE_API_KEY,
		address: req.body.nameLocation,
	};

	const response = await axios.get(baseUrl, { params });
	return response.data.results[0].geometry.location;
};
export const separateNameLocation = (nameLocation: string) => {
	const arr = nameLocation.split(",");
	const name = arr[0];
	const location = arr.slice(1).join(",").substring(1);
	return { name, location };
};
