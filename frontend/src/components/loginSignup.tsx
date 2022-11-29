import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface fieldError {
	field: string;
	message: string;
}

type fieldInput = "email" | "password";
const LoginSignup = (props: {
	action: Function;
	formType: string;
}): JSX.Element => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<null | fieldError[]>(null);
	const navigate = useNavigate();
	const handleUpdate = (field: fieldInput) => {
		return (e: React.FormEvent<HTMLInputElement>): void =>
			setUser({ ...user, [field]: e.currentTarget.value });
	};
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		let data = await props.action(user);
		if (data.errors) {
			return setErrors(data.errors);
		}
		navigate("/home");
	};

	return (
		<form className="LoginSignup-form" onSubmit={handleSubmit}>
			<label htmlFor="email">Email</label>
			<input type="text" id="email" onChange={handleUpdate("email")} />
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				onChange={handleUpdate("password")}
				autoComplete="on"
			/>
			<button type="submit">{props.formType} user!</button>
			{errors ? (
				errors.map((error, i) => <p key={i}>{error.message}</p>)
			) : (
				<></>
			)}
		</form>
	);
};
export default LoginSignup;
