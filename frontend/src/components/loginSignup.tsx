import {
	Button,
	Dialog,
	DialogFooter,
	DialogHeader,
	DialogBody,
	Input,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/user_api";
import userContext from "../utils/userContext";

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

type fieldInput = "username" | "password";
const LoginSignup = (props: LoginSignupProps): JSX.Element => {
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const { setCurrentUser } = useContext(userContext);

	const { action, formType, setOpen, setModal, open } = props;
	const [errors, setErrors] = useState<null | fieldError[]>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!open) {
			setErrors(null);
		}
	}, [open]);

	const handleDemoUser = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setUser({
			username: "test1",
			password: "password",
		});
		await loginUser(user);
		navigate("/home/feed");
	};
	const handleOpen = (formType: string) => {
		setModal(formType);
		setOpen(!open);
	};
	const handleCancel = (): void => {
		setOpen(false);
		setErrors(null);
		return;
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
		setCurrentUser(data);
		navigate("/home/feed");
	};

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			animate={{
				mount: {
					animation: "transition.slideUpBigIn",
					duration: 300,
				},
				unmount: {
					animation: "transition.slideDownBigOut",
					duration: 300,
				},
			}}
			size="xs"
		>
			<form onSubmit={handleSubmit}>
				<DialogHeader className="flex justify-center text-4xl font-light to-black items-end ">
					{formType == "Login" ? "Log In" : "Sign Up"}
				</DialogHeader>
				{errors ? (
					errors.map((error, i) => (
						<div className="flex flex-col items-center my-2" key={i}>
							<div className="text-red-500 text-sm">{error.message}</div>
						</div>
					))
				) : (
					<div className="text-red-500 text-sm"></div>
				)}
				<DialogBody divider className="flex flex-col gap-4">
					<Input
						variant="outlined"
						label="Username"
						type="text"
						size="md"
						id="username"
						color="green"
						className="w-3"
						onChange={handleUpdate("username")}
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
				<DialogFooter className="flex flex-col items-end gap-2">
					<div className="flex flex-row justify-end gap-2">
						<Button
							onClick={handleCancel}
							color="red"
							variant="outlined"
							ripple={false}
							className="normal-case"
						>
							Cancel
						</Button>

						<Button
							size="md"
							ripple={false}
							type="submit"
							color="green"
							className="normal-case"
						>
							{formType} User!
						</Button>
					</div>
					<Button
						size="md"
						variant="outlined"
						ripple={false}
						type="button"
						onClick={handleDemoUser}
						color="green"
						className="normal-case hover:shadow-none"
					>
						Demo User login
					</Button>
				</DialogFooter>
			</form>
		</Dialog>
	);
};
export default LoginSignup;
