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
import { loginUser } from "../utils/user_api";
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

	const handleDemoUser = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setUser({
			email: "test1",
			password: "password",
		});
		await loginUser(user);
		navigate("/home/feed");
	};
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
		navigate("/home/feed");
	};

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0.9, y: -100 },
			}}
			size="xs"
		>
			<form onSubmit={handleSubmit}>
				<DialogHeader className="text-4xl font-light font-mono to-black items-end text-right">
					{formType == "Login" ? "Log In" : "Sign Up"}
				</DialogHeader>
				<DialogBody className="flex flex-col gap-4">
					<Input
						variant="outlined"
						label="Email"
						type="text"
						size="md"
						id="email"
						color="green"
						className="w-3"
						onChange={handleUpdate("email")}
					/>
					<Input
						variant="outlined"
						label="Password"
						type="password"
						size="md"
						id="password"
						color="green"
						onChange={handleUpdate("password")}
						autoComplete="on"
					/>
				</DialogBody>
				<DialogFooter className="flex gap-5">
					<Button
						onClick={() => setOpen(false)}
						color="red"
						variant="outlined"
						ripple={false}
						className="normal-case"
					>
						Cancel
					</Button>

					<Button
						variant="outlined"
						size="md"
						ripple={false}
						type="button"
						onClick={handleDemoUser}
						color="green"
						className="normal-case"
					>
						Demo User login
					</Button>
					<Button
						variant="outlined"
						size="md"
						ripple={false}
						type="submit"
						color="green"
						className="normal-case"
					>
						{formType} User!
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
