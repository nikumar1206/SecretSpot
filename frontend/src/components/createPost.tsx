import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Textarea,
} from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postForm } from "../types";
import { createPost } from "../utils/post_api";
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

	const resetModalonClose = () => {
		setOpen(false);
		setPost({
			place: "",
			rating: "",
			caption: "",
		});
		setErrors([{ message: "" }]);
	};

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
						type={"float"}
						color="teal"
						maxLength={5}
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
						onClick={resetModalonClose}
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
						disabled={
							post.place === "" || post.rating === "" || post.caption === ""
						}
						className="normal-case transition ease-in-out delay-75 hover:scale-110 hover:bg-teal-700 duration-300 rounded-sm"
					>
						{postMutation.isLoading ? (
							<span className="inline-block animate-spin rounded-full w-full h-full">
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									></path>
								</svg>
							</span>
						) : (
							"Add Post"
						)}
					</Button>
				</DialogFooter>
			</form>
		</Dialog>
	);
};
export default CreatePostForm;
