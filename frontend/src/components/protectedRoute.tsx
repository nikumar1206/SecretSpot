import { ReactNode } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../utils/user_api";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isFetched, data } = useQuery("currentUser", fetchCurrentUser);
	if (isFetched && !data) {
		return <Navigate to={"/"} replace />;
	}

	return children;
};
export default ProtectedRoute;
