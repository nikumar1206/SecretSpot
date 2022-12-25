import { createContext } from "react";

const userContext = createContext({
	currentUser: null,
	setCurrentUser: (user: any) => {},
});

export default userContext;
