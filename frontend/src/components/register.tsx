import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { registerUser } from "../utils/user_api";

type fieldInput = "email" | "password";
const Register = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const handleUpdate = (field: fieldInput) => {
		return (e: React.FormEvent<HTMLInputElement>): void =>
			setUser({ ...user, [field]: e.currentTarget.value });
	};
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { error } = useMutation({
			mutationKey: ["registerUser"],
			mutationFn: () => registerUser(user),
		});
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
		</form>
	);
};
export default Register;
