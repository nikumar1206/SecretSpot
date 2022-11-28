import React, { useState } from "react";
import { registerUser } from "../utils/user_api";
interface fieldError {
	field: string;
	message: string;
}

type fieldInput = "email" | "password";
const Register = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<null | fieldError[]>(null);

	const handleUpdate = (field: fieldInput) => {
		return (e: React.FormEvent<HTMLInputElement>): void =>
			setUser({ ...user, [field]: e.currentTarget.value });
	};
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		let data = await registerUser(user);
		console.log(data.errors);

		if (data.errors) {
			setErrors(data.errors);
		}
	};

	return (
		<form className="register-form" onSubmit={handleSubmit}>
			<label htmlFor="email">Email</label>
			<input type="text" id="email" onChange={handleUpdate("email")} />
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				onChange={handleUpdate("password")}
			/>
			<button type="submit">Register user!</button>
			{errors ? (
				errors.map((error, i) => <p key={i}>{error.message}</p>)
			) : (
				<></>
			)}
		</form>
	);
};
export default Register;
