import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Text } from "@radix-ui/themes";

import * as Toggle from "@radix-ui/react-toggle";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePerson, MdOutlinePersonAdd } from "react-icons/md";
import { PiPasswordLight } from "react-icons/pi";

import { loginUser, registerUser } from "@/utils/user_api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router";
type FormType = "Login" | "Sign Up";

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

	const [formType, setFormType] = useState<FormType>("Login");

	const { open } = props;
	const [errors, setErrors] = useState<null | fieldError[]>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!open) {
			setErrors(null);
		}
	}, [open]);

	const handleUpdate = (field: fieldInput) => {
		return (e: React.FormEvent<HTMLInputElement>): void =>
			setUser({ ...user, [field]: e.currentTarget.value });
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		let data =
			formType === "Login" ? await loginUser(user) : await registerUser(user);
		if (data.errors) {
			return setErrors(data.errors);
		}
		navigate("/home/feed");
	};

	return (
		<Dialog>
			{console.log(formType)}
			<DialogTrigger>
				<Button color="teal" variant="default">
					<Text size={"2"}>Login / Sign-Up</Text>
				</Button>
			</DialogTrigger>
			<DialogContent
				className="flex flex-col gap-4 max-w-[350px]"
				size={"2"}
				aria-describedby="Login or Signup"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle className="flex justify-center text-4xl font-light to-black items-end mb-6">
						{formType == "Login" ? "Log In" : "Sign Up"}
					</DialogTitle>
					{errors ? (
						errors.map((error, i) => (
							<div className="flex flex-col items-center my-2" key={i}>
								<div className="text-red-500 text-sm">{error.message}</div>
							</div>
						))
					) : (
						<div className="text-red-500 text-sm"></div>
					)}
					<div className="w-[95%] flex justify-end">
						<Toggle.Root
							className="flex gap-x-2 py-1 px-2 justify-center rounded-sm  leading-4  text-sm border-gray-400 bg-black text-white"
							onClick={() =>
								setFormType(formType === "Login" ? "Sign Up" : "Login")
							}
						>
							{formType === "Login" ? <MdOutlinePersonAdd size={16} /> : <></>}
							{formType === "Sign Up" ? <MdOutlinePerson size={16} /> : <></>}
							{formType === "Login" ? "New to SecretSpot?" : "Existing User ?"}
						</Toggle.Root>
					</div>

					<div className="flex flex-col gap-y-3 my-4 items-center">
						<Input
							placeholder="email"
							id="email"
							onChange={handleUpdate("email")}
							autoComplete="on"
							className="w-[90%] transition-colors ease-in-out duration-300"
							icon={AiOutlineMail}
							iconProps={{ behavior: "prepend" }}
						/>
						<Input
							placeholder="password"
							type="password"
							id="password"
							className="w-[90%] transition-colors ease-in-out duration-300"
							onChange={handleUpdate("password")}
							autoComplete="on"
							icon={PiPasswordLight}
							iconProps={{ behavior: "prepend" }}
						/>
					</div>
					<DialogFooter className="flex flex-row justify-end gap-2 mt-6 w-[95%]">
						<DialogClose>
							<Button
								color="red"
								variant="destructive"
								className="normal-case transition ease-in-out delay-75 hover:bg-red-500 hover:text-white duration-300 cursor-pointer"
							>
								Cancel
							</Button>
						</DialogClose>

						<Button
							type="submit"
							className="normal-case bg-teal-500 hover:bg-teal-500 transition-colors ease-in-out"
						>
							{formType} User!
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default LoginSignup;
