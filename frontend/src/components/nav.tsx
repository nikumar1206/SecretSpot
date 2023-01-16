import {
	Button,
	IconButton,
	MobileNav,
	Navbar,
	Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import CreatePostForm from "./createPost";
import TabComponent from "./tab";
import { UserProfile } from "./userProfile";

export const Nav = ({ params }: { params: string }) => {
	const [openNav, setOpenNav] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
		return () =>
			window.removeEventListener(
				"resize",
				() => window.innerWidth >= 960 && setOpenNav(false)
			);
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<a href="#" className="flex items-center">
					Pages
				</a>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<a href="#" className="flex items-center">
					Account
				</a>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<a href="#" className="flex items-center">
					Blocks
				</a>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<a href="#" className="flex items-center">
					Docs
				</a>
			</Typography>
		</ul>
	);

	return (
		<div className="bg-teal-50 ">
			<Navbar className="relative mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 w-4/6 z-50 h-20">
				<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
					<UserProfile />

					<div className="hidden lg:block">
						<TabComponent params={params} />
					</div>
					<Button
						variant="outlined"
						ripple={false}
						size="sm"
						className="hidden lg:inline-block lowercase active:lowercase border-none active:outline-0 focus:outline-0 rounded-none"
						onClick={() => setOpen(!open)}
					>
						<IoCreateOutline className="text-teal-500 text-2xl" />
					</Button>
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
				<MobileNav open={openNav}>
					{navList}
					<Button variant="gradient" size="sm" fullWidth className="mb-2">
						<span>Buy Now</span>
					</Button>
				</MobileNav>
			</Navbar>
		</div>
	);
};
export default Nav;
