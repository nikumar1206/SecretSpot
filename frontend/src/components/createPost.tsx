import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { createPost } from "../utils/post_api";
import { postForm } from "../types";
import { Autocomplete } from "@react-google-maps/api";
import { Mention, MentionsInput } from "react-mentions";
interface createPostProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

const CreatePostForm = ({ open, setOpen }: createPostProps) => {
	const [post, setPost] = useState<postForm>({
		placeName: "",
		caption: "",
	});
	const [errors, setErrors] = useState([{ message: "" }]);

	const handlePlaceChanged = () => {
		const nameLocationPlace = document.getElementById(
			"name"
		) as HTMLInputElement;
		setPost({
			...post,
			nameLocation: nameLocationPlace.value,
		});
	};

	const handleUpdate = (field: string) => {
		return (e: any) => {
			setPost({ ...post, [field]: e.target.value });
		};
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		createPost(post).then((res) => {
			if (!res.errors) {
				return setOpen(false);
			} else {
				return setErrors(res.errors);
			}
		});
	};

	return (
		<Dialog
			dismiss={{
				outsidePointerDown: false,
				escapeKey: false,
			}}
			open={open}
			tabIndex={-1}
			handler={() => setOpen(!open)}
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
			size="sm"
			className="z-10 rounded-none"
		>
			<form onSubmit={handleSubmit}>
				<DialogHeader className="text-4xl font-light items-end flex justify-center">
					Create Post
				</DialogHeader>
				<DialogBody className="flex flex-col gap-4">
					<Autocomplete
						types={["restaurant"]}
						onPlaceChanged={handlePlaceChanged}
					>
						<Input
							variant="outlined"
							label="Name"
							type="text"
							size="md"
							color="green"
							id="name"
							className="w-3"
							autoComplete="off"
							onChange={handleUpdate("placeName")}
						/>
					</Autocomplete>
					<MentionsInput
						value={post.caption}
						id="caption"
						onChange={handleUpdate("caption")}
						placeholder="Caption, @mentions"
						className="placeholder:px-5 placeholder:py-2 box-border p-10 peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-green-500 !resize-none"
					>
						<Mention
							markup="@[__display__]"
							displayTransform={(id, display) => `@${display}`}
							trigger="@"
							data={[
								{ id: "1", display: "John" },
								{ id: "2", display: "Paul" },
							]}
							appendSpaceOnAdd
						/>
					</MentionsInput>
				</DialogBody>
				<DialogFooter className="flex gap-5">
					<Button
						onClick={() => setOpen(false)}
						color="red"
						variant="outlined"
						ripple={false}
						className="normal-case transition ease-in-out delay-75 hover:bg-red-500 hover:text-white duration-300 rounded-sm"
					>
						Cancel
					</Button>

					<Button
						size="md"
						ripple={false}
						type="submit"
						color="green"
						className="normal-case transition ease-in-out delay-75 hover:scale-110 hover:bg-green-700 duration-300 rounded-sm"
					>
						Create Post!
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
