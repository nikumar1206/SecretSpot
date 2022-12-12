import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { createPost } from "../utils/post_api";

interface createPostProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

interface postInfo {
	name: string;
	location: string;
	caption: string;
	attendies: string[];
}
const CreatePostForm = ({ open, setOpen }: createPostProps) => {
	const [post, setPost] = useState<postInfo>({
		name: "",
		location: "",
		caption: "",
		attendies: [""],
	});
	const [errors, setErrors] = useState([{ message: "" }]);

	const handleUpdate = (field: string) => {
		return (
			e:
				| React.FormEvent<HTMLInputElement>
				| React.FormEvent<HTMLTextAreaElement>
		) => {
			setPost({ ...post, [field]: e.currentTarget.value });
		};
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await createPost(post);
	};
	return (
		<Dialog
			open={open}
			handler={() => setOpen(!open)}
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0.9, y: -100 },
			}}
			size="lg"
		>
			<form onSubmit={handleSubmit}>
				<DialogHeader className="text-4xl font-light font-mono to-black items-end text-right">
					Create Post
				</DialogHeader>
				<DialogBody className="flex flex-col gap-4">
					<Input
						variant="outlined"
						label="name"
						type="text"
						size="md"
						color="green"
						id="name"
						className="w-3"
						onChange={handleUpdate("name")}
					/>
					<Input
						variant="outlined"
						label="location"
						type="text"
						size="md"
						color="green"
						id="location"
						onChange={handleUpdate("location")}
					/>
					<Textarea
						variant="outlined"
						label="Caption"
						onChange={handleUpdate("caption")}
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
						className="normal-case border-green-500 text-green-500"
					>
						post!
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
