import axios from "axios";

interface userInterface {
	email: string;
	password: string;
}

export const loginUser = async (userInfo: userInterface) => {
	try {
		let res = await axios.post("/api/users/login", userInfo);
		return res.data;
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

export const isAuthed = async () => {
	try {
		let res = await axios.get("/api/users/authed");
		return res.data;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

export const logoutUser = async () => {
	try {
		let res = await axios.post("/api/users/logout");
		return res.data;
	} catch (error) {
		throw new Error(`${error}`);
	}
};
