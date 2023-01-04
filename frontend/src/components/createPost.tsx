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
import { postForm } from "../types";
import { Autocomplete } from "@react-google-maps/api";
import { useMutation, useQueryClient } from "react-query";
interface createPostProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

const CreatePostForm = ({ open, setOpen }: createPostProps) => {
	const queryClient = useQueryClient();
	const [post, setPost] = useState<postForm>({
		place: "",
		rating: "",
		caption: "",
	});
	const [errors, setErrors] = useState([{ message: "" }]);

	const postMutation = useMutation(createPost, {
		onSuccess: () => {
			queryClient.invalidateQueries("posts");
		},
	});

	const handlePlaceChanged = () => {
		const placeName = document.getElementById("name") as HTMLInputElement;
		setPost({
			...post,
			place: placeName.value,
		});
	};
	const handleUpdate = (field: string) => {
		return (e: any) => {
			setPost({ ...post, [field]: e.target.value });
		};
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		postMutation.mutateAsync(post).then((res) => {
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
				{errors ? (
					errors.map((error, i) => (
						<p key={i} className="text-red-500 text-center">
							{error.message}
						</p>
					))
				) : (
					<></>
				)}
				<DialogBody className="flex flex-col gap-4">
					<Autocomplete
						types={["restaurant"]}
						onPlaceChanged={handlePlaceChanged}
					>
						<Input
							variant="outlined"
							label="Location Name"
							type="text"
							size="md"
							color="teal"
							id="name"
							className="w-3"
							autoComplete="off"
							onChange={handleUpdate("placeName")}
						/>
					</Autocomplete>

					<Input
						type={"number"}
						color="teal"
						maxLength={2}
						label="Rating"
						onChange={handleUpdate("rating")}
					/>

					<Textarea
						variant="outlined"
						color="teal"
						id="caption"
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
						className="normal-case transition ease-in-out delay-75 hover:bg-red-500 hover:text-white duration-300 rounded-sm"
					>
						Cancel
					</Button>

					<Button
						size="md"
						ripple={false}
						type="submit"
						color="teal"
						disabled={post.place === "" || post.rating === ""}
						className="normal-case transition ease-in-out delay-75 hover:scale-110 hover:bg-teal-700 duration-300 rounded-sm"
					>
						Create Post!
					</Button>
				</DialogFooter>
			</form>
		</Dialog>
	);
};
export default CreatePostForm;
