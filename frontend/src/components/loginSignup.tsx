import { Button, Input } from "@material-tailwind/react";
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
		<form className="flex w-72 flex-col gap-4" onSubmit={handleSubmit}>
			<Input
				variant="outlined"
				label="Email"
				type="text"
				size="md"
				id="email"
				className="w-3"
				onChange={handleUpdate("email")}
			/>
			<Input
				variant="outlined"
				label="Password"
				type="password"
				size="md"
				id="password"
				onChange={handleUpdate("password")}
				autoComplete="on"
			/>
			<Button variant="outlined" size="md" ripple={false} type="submit">
				{props.formType} user!
			</Button>
			{errors ? (
				errors.map((error, i) => <p key={i}>{error.message}</p>)
			) : (
				<></>
			)}
		</form>
	);
};
export default LoginSignup;
