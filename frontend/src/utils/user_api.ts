import axios from "axios";

interface userInterface {
	username: string;
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

export const fetchCurrentUser = async () => {
	try {
		let res = await axios.get("/api/users/profile");
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

export const addFollower = async (username: string) => {
	try {
		let res = await axios.post(`/api/users/follow/${username}`);
		return res.data;
	} catch (error) {
		throw new Error(`${error}`);
	}
};
