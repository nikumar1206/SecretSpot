import axios from "axios";

interface userInterface {
	email: string;
	password: string;
}

export const loginUser = async (userInfo: userInterface) => {
	try {
		let data = await axios.post("/api/users/login", userInfo);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const registerUser = async (userInfo: userInterface) => {
	try {
		let res = await axios.post("/api/users/register", userInfo);
		return res.data;
	} catch (error) {
		throw new Error(`${error}`);
	}
};
