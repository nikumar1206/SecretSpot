import {
	Button,
	Dialog,
	DialogFooter,
	DialogHeader,
	DialogBody,
	Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface fieldError {
	field: string;
	message: string;
}
interface LoginSignupProps {
	action: Function;
	formType: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setModal: React.Dispatch<React.SetStateAction<string>>;
	open: boolean;
}
type fieldInput = "email" | "password";
const LoginSignup = (props: LoginSignupProps): JSX.Element => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const { action, formType, setOpen, setModal, open } = props;
	const [errors, setErrors] = useState<null | fieldError[]>(null);
	const navigate = useNavigate();

	const handleOpen = (formType: string) => {
		setModal(formType);
		setOpen(!open);
	};
	const handleUpdate = (field: fieldInput) => {
		return (e: React.FormEvent<HTMLInputElement>): void =>
			setUser({ ...user, [field]: e.currentTarget.value });
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		let data = await action(user);
		if (data.errors) {
			return setErrors(data.errors);
		}
		navigate("/home");
	};

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0.9, y: -100 },
			}}
			size="sm"
		>
			<form className="flex w-72 flex-col gap-4" onSubmit={handleSubmit}>
				<DialogHeader className="flex ml-auto mr-auto">
					{formType == "register" ? "Log In" : "Sign Up"}
				</DialogHeader>
				<DialogBody>
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
				</DialogBody>
				<DialogFooter>
					<Button
						onClick={() => setOpen(false)}
						color="red"
						variant="outlined"
						ripple={false}
					>
						cancel
					</Button>
					<Button onClick={() => setOpen(false)} color="red">
						cancel
					</Button>
					<Button variant="outlined" size="md" ripple={false} type="submit">
						{formType} user!
					</Button>
					{errors ? (
						errors.map((error, i) => <p key={i}>{error.message}</p>)
					) : (
						<></>
					)}
				</DialogFooter>
			</form>
		</Dialog>
	);
};
export default LoginSignup;
