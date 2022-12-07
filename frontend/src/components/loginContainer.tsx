import { useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../utils/user_api";
import LoginSignup from "./loginSignup";

const LoginContainer = () => {
	const { pathname } = useLocation();
	if (pathname == "/register") {
		return <LoginSignup action={registerUser} formType={"Register"} />;
	} else {
		return <LoginSignup action={loginUser} formType={"Login"} />;
	}
};
export default LoginContainer;
