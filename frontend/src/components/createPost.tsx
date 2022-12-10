import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
} from "@material-tailwind/react";

const CreatePostForm = ({ open }) => {
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
						type="submit"
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
export default CreatePostForm;
