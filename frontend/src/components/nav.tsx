import {
	Dialog,
	DialogBody,
	DialogHeader,
	IconButton,
} from "@material-tailwind/react";

import { Card, Tabs } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import CreatePostForm from "./createPost";
import Search from "./search";
import { UserProfile } from "./userProfile";
export const Nav = ({ params }: { params: string }) => {
	const navigate = useNavigate();
	const [openNav, setOpenNav] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<div className="">
			<Card className="relative mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 w-4/6 z-50">
				<div className="container mx-auto flex items-center justify-between text-black">
					<UserProfile />

					<Tabs.Root
						className="w-4/5 flex items-center justify-center select-none"
						activationMode="manual"
					>
						<Tabs.List
							color="teal"
							className="w-full flex justify-center"
							size="2"
							highContrast
						>
							<Tabs.Trigger
								aschild
								value="Feed"
								className="hover:bg-gray-300 transition-colors ease-in-out w-1/3 cursor-pointer rounded-sm focus:bg-none"
								onClick={() => navigate("/home/feed")}
							>
								<span className="hover:bg-inherit">Feed</span>
							</Tabs.Trigger>
							<Tabs.Trigger
								onClick={() => navigate("/home/lists")}
								value="My Lists"
								children="My Lists"
								className="hover:bg-gray-300 transition-colors ease-in-out w-1/3 cursor-pointer rounded-sm hover:"
							/>
							<Tabs.Trigger
								onClick={() => navigate("/home/timeline")}
								value="Timeline"
								children="Timeline"
								className="hover:bg-gray-300 transition-colors ease-in-out w-1/3 cursor-pointer rounded-sm hover:"
							/>
						</Tabs.List>
					</Tabs.Root>
					<div className="inline-flex gap-x-5">
						<motion.button
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.85 }}
							className="hidden lg:inline-block lowercase active:lowercase border-none active:outline-0 focus:outline-0 rounded-none"
							onClick={() => setOpen(!open)}
						>
							<IoCreateOutline className="text-teal-500 text-2xl" />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.85 }}
							className="hidden lg:inline-block lowercase active:lowercase border-none active:outline-0 focus:outline-0 rounded-none bg-none"
							onClick={() => setSearchOpen(!searchOpen)}
						>
							<BiSearchAlt className="text-teal-500 text-2xl" />
						</motion.button>
					</div>
					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
						ripple={false}
						onClick={() => setOpenNav(!openNav)}
					>
						{openNav ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="h-6 w-6"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</IconButton>
				</div>
				<CreatePostForm open={open} setOpen={setOpen} />
				<Dialog
					handler={() => setSearchOpen(!setSearchOpen)}
					open={searchOpen}
					size="md"
					className="h-60 flex flex-col justify-center items-center overflow-visible"
				>
					<DialogHeader className="text-center flex justify-center font-h1">
						Search
					</DialogHeader>
					<DialogBody className="flex justify-center">
						<Search />
					</DialogBody>
				</Dialog>
			</Card>
		</div>
	);
};
export default Nav;
